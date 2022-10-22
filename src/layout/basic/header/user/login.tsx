import { Button } from "@mantine/core"
import { signIn } from "next-auth/react"

export const UserLoginButton = () => {
	return <Button variant="default" onClick={() => signIn('github')}>Log in</Button>
}