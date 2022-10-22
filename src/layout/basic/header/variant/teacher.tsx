import { HeaderDropdown } from "../dropdown"
import { HeaderLink } from "../link"

export const TeacherHeaderNavigation = () => <>
	<HeaderLink label='Startseite' href='#' />
	<HeaderDropdown label="Klassen" href="#" footer={<div></div>} >
		<div></div>
	</HeaderDropdown>
</>;