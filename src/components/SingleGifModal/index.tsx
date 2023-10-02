import { IGif } from "@giphy/js-types";
import { Gif } from "@giphy/react-components";
import { Box, Card, CardContent, Tooltip, Typography, useTheme } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarRateIcon from '@mui/icons-material/StarRate';

interface SingleGifModalProps {
    gif: IGif;
    onClick: (value: React.SetStateAction<IGif | undefined>) => void;
}

const rating = (rate: string): string => {
    switch (rate) {
        case 'g':
            return 'Level 1';
        case 'pg':
            return 'Level 2';
        case 'pg-13':
            return 'Level 3';
        case 'r':
            return 'Level 4';
        default:
            return 'Unknown';
    }
}

const SingleGifModal = (props: SingleGifModalProps) => {
    const theme = useTheme();
    return (
        <Card
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(0, 0, 0, .8)",
                zIndex: theme.zIndex.modal,
            }}
            onClick={(e) => {
                e.preventDefault();
                props.onClick(undefined);
            }}
        >
            <CardContent style={{
                background: theme.palette.background.paper,
                width: 300
            }}>
                <Gif gif={props.gif} width={300} />
            </CardContent>
            <CardContent style={{
                background: theme.palette.background.paper,
                width: 300,
                display: "flex",
                justifyContent: "space-between",
            }}
            >
                <Typography gutterBottom variant="h5" component="div" style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                    <AccountCircleIcon />{props.gif.username ? props.gif.username : "Unknown"}
                </Typography>
                <Box style={{
                    display: "flex",
                }}>
                    <Tooltip title={rating(props.gif.rating)} >
                        <Typography gutterBottom variant="h5" component="div" px={1} mx={2} style={{
                            background: theme.palette.secondary.main,
                            borderRadius: 5,
                        }}>
                            {props.gif.rating}
                        </Typography>
                    </Tooltip >
                </Box>
            </CardContent>
        </Card>
    )
}

export default SingleGifModal;