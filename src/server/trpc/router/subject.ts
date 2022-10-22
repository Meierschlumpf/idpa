import { Class, Subject } from "@prisma/client";
import { protectedProcedure, router } from "../trpc";

export const subjectRouter = router({
  getHoverCard: protectedProcedure
  .query(async ({ctx}) => {
    const classSubjects = await ctx.prisma.classSubject.findMany({
      include: {
        subject: true,
        lessons: true,
        class: {
          include: {
            students: {
              include: {
                account: true,
              },
              where: {
                account: {
                  userId: ctx.session.user.id
                }
              }
            }
          }
        },
        students: {
          include: {
            account: true
          },
          where: {
            account: {
              userId: ctx.session.user.id
            }
          }
        }
      }});
      const data = classSubjects.filter(cs => cs.students.length >= 1 || cs.class.students.length >= 1);
    return data.map(cs => ({
      id: cs.subject.id,
      name: cs.subject.name,
      routeName: cs.subject.routeName,
      icon: cs.subject.icon,
      class: {
        id: cs.class.id,
        name: cs.class.name
      },
      lessons: cs.lessons.map(l => ({
        id: l.id,
        start: l.start,
        end: l.end,
        day: l.day
      })).sort((a, b) => a.day <= b.day && a.start < b.start ? -1 : 1)
    })).sort((a, b) => {
      const firstALesson = a.lessons.at(0);
      const firstBLesson = b.lessons.at(0);
      if (!firstALesson || !firstBLesson) return 0;
      if (firstALesson.day <= firstBLesson.day && firstALesson.start < firstBLesson.start) return -1
      return 1;
    })
  }),
  getSidebar: protectedProcedure
  .query(async ({ctx}) => {
    const student = await ctx.prisma.student.findFirst({
      include: {
       account: true,
       classes: {
        include: {
          subjects: {
            include: {
              subject: true
            }
          }
        }
       },
       classSubjects: {
        include: {
          subject: true,
          class: true
        }
       }
      },
      where: {
        account: {
          userId: ctx.session.user.id
        }
      }
    });

    const classSubjectClasses = student?.classSubjects.reduce((previous: (Class & {
      subjects: Subject[];
  })[], current) => {
    if (!previous.some(c => c.id === current.classId)) {
      previous.push({
        ...current.class,
        subjects: [current.subject]
      });
    return previous;
    }
    
    const currentClass = previous.find(c => c.id === current.classId);
    return currentClass ? [
      ...previous.filter(c => c.id !== current.class.id),
      {
        ...currentClass,
        subjects: [...currentClass?.subjects ?? [], current.subject]
      }
    ] : previous;
  }, [])
    
    const classes = [
      ...student?.classes.map(c => ({
        ...c,
        subjects: c.subjects.map(s => s.subject)
      })) ?? [],
      ...classSubjectClasses ?? []
    ]

    return classes.sort((a, b) => a.name.localeCompare(b.name))
  }),
});
