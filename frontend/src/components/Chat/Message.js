//rafce
import React from 'react'
import { Box, Stack} from '@mui/material'
import { Chat_History } from '../../data'
import { TimeLine } from './MsgType'
const Message = () => {
    console.log(Chat_History)
  return (
    <Box p={3}>
        <Stack spacing={3}>
            {Chat_History.map((el)=>{
                switch (el.type){
                    case 'divider':
                        
                        return <TimeLine el={el} />
                    case "msg":
                        switch(el.subtype){
                            case "img":
                                //img message
                                break;
                            case "doc":
                                //doc message
                                break;
                            case "link":
                                break;
                            case "reply":
                                break;
                            
                            default:
                                //text
                                break;
                        }
                    break;

                    default:
                        return <></>;
                }
            })}
        </Stack>
    </Box>
  )
}

export default Message;