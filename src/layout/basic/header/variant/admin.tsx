import { IconSchool, IconUser, IconUsers } from "@tabler/icons";
import { HeaderDropdown } from "../dropdown";
import { DropdownSublink } from "../dropdown/sublink";
import { HeaderLink } from "../link";

export const AdminHeaderNavigation = () => {
	return <>
		<HeaderLink label='Startseite' href='#' />
		<HeaderDropdown label="Daten" href="#" footer={<div></div>} >
			{data?.map(item =>
				<DropdownSublink
					key={item.label}
					label={item.label}
					link={item.link}
					icon={<item.icon />}
					description={item.description}
				/>
			)}
		</HeaderDropdown>
	</>
};

const data = [{
	label: "Fächer",
	link: "/subjects",
	icon: IconSchool,
	description: "Module und Schulfächer"
},
{
	label: "Klassen",
	link: "/classes",
	icon: IconUsers,
	description: "Schulklassen"
},
{
	label: "Benutzer",
	link: "/users",
	icon: IconUser,
	description: "Benutzer und Rechte"
},
];