import { Avatar } from "@chakra-ui/react"

export const ChatAvatar = () => {
    return (
        <Avatar.Root key={"solid"} variant={"solid"} colorPalette={"teal"} mr={'3'} size={'xl'}>
            <Avatar.Fallback name="Adhi Nugroho" />
        </Avatar.Root>
    )
}
