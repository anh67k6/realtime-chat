import React from "react";
import { Stack, Divider, Typography, Box, Link, IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import { Message_options } from "../../data";
const TimeLine = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider width="46%" />
      <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
        {el.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

const TextMsg = ({ el }) => {
  const theme = useTheme();

  console.log(theme);
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
        }}
        borderRadius={1.5}
        width="max-content"
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text : "#fff"}
        >
          {el.message}
        </Typography>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const MediaMsg = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
        }}
        borderRadius={1.5}
        width="max-content"
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />

          <Typography variant="body2" color={theme.palette.text}>
            {el.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const ReplyMsg = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
        }}
        borderRadius={1.5}
        width="max-content"
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {el.message}
            </Typography>
          </Stack>

          <Typography variant="body2" color={theme.palette.text}>
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const LinkMsg = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
        }}
        borderRadius={1.5}
        width="max-content"
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            alignItems="left"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={el.preview}
              alt={el.message}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            />
            <Stack spacing={2}>
              <Typography variant="subtitle2">Hi</Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.primary.main }}
                component={Link}
                to="//https://www.youtube.com/"
              >
                Hi
              </Typography>
            </Stack>
            <Typography variant="body2" color={theme.palette.text}>
              {el.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const DocMsg = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
        }}
        borderRadius={1.5}
        width="max-content"
      >
        <Stack spacing={2}>
          <Stack p={2} direction='row' spacing={3} alignItems='center' sx={{ backgroundColor: theme.palette.background.paper, border: 1 }}>
            <Image size={48} />
            <Typography variant="caption">Download</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
}

const MessageOptions = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size={20}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem onClick={handleClose}>{el.title}</MenuItem>
          ))}

        </Stack>
      </Menu>
    </>
  )
}

export { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg };