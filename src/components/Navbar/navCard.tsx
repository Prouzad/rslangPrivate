import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

interface Props {
    open: boolean;
    renderSwitch?: any;
    text?: string;
}

export default function NavCard({ open, renderSwitch, text }: Props) {
    return (
        <>
            <ListItem
                key={text}
                disablePadding
                sx={{ display: 'block' }}
            >
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {renderSwitch}
                    </ListItemIcon>
                    <ListItemText
                        primary={text}
                        sx={{
                            opacity: open ? 1 : 0,
                            textDecoration: 'none',
                            color: 'white',
                        }}
                    />
                </ListItemButton>
            </ListItem>
        </>
    )
}
