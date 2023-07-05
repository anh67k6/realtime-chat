import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FetchUsers } from "../../redux/slices/app";
import React, { useEffect, useState } from "react";

const UsersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchUsers());
  }, []);

  const { users } = useSelector((state) => state.app);
  return (
    <>
      {users.map((el, idx) => {
        //TODO => Render UserComponent
        return <></>;
      })}
    </>
  );
};

const FriendsList = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(FetcheFriends());
    }, []);
  
    const { friends } = useSelector((state) => state.app);
    return (
      <>
        {friends.map((el, idx) => {
          //TODO => Render UserComponent
          return <></>;
        })}
      </>
    );
  };

  const FriendRequestList = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(FetchFriendRequests());
    }, []);
  
    const { friendRequests } = useSelector((state) => state.app);
    return (
      <>
        {friendRequests.map((el, idx) => {
          //TODO => Render UserComponent
          return <></>;
        })}
      </>
    );
  };

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      {/* Dialog Content */}
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {() => {
              switch (value) {
                case 0: //display all users
                    return <UsersList />
                case 1: //display all friends
                    return <FriendsList />
                case 2:
                    <FriendRequestList />
                default:
                    break;
              }
            }}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
