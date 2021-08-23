import {
  MenuItem,
  MenuList,
  useColorModeValue,
  MenuButton,
  Menu,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { VscBellDot } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkFriends, clearNotifications } from "../../redux/slices/friendsSlice";
import NewPostCard from "./NewPostCard";

const NewPosts = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.userState);
  const friendsPosts = useAppSelector((state) => state.friendsReducer.newPosts);

  useEffect(() => {
    dispatch(checkFriends(user.id));
  }, [dispatch, user.id]);

  const handleClear = async () => {
    if(user.id){
      dispatch(clearNotifications(user.id))
    }
  }

  return (
    <Menu>
      {friendsPosts.length === 0 ? (
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <IconButton
            size="md"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
            isActive={true}
          />
        </MenuButton>
      ) : (
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <IconButton
            size="md"
            variant="ghost"
            aria-label="open menu"
            icon={<VscBellDot />}
            isActive={true}
            colorScheme="red"
          />
        </MenuButton>
      )}
      <MenuList
        bg={useColorModeValue("#F0F8FF", "gray.900")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <MenuItem>
          <Button onClick={() => handleClear()}>Clear All</Button>
        </MenuItem>
        {(friendsPosts.length > 0 && user) &&
          friendsPosts.map((topic) => (
            <MenuItem>
              <NewPostCard threadid={topic} user={user} />
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

export default NewPosts;
