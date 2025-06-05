import { Button, Menu, Portal } from "@chakra-ui/react"
import { IoIosArrowDown } from "react-icons/io"

export const ChatMenu = () => {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant="outline" size="sm">
                    Menu <IoIosArrowDown />
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item value="new-txt-a">
                            Select Medicine
                        </Menu.Item>
                        <Menu.Item value="new-win-a">
                            Edit Recipe
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}
