import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function Pricing() {
    return (
        <>
            <h1
                className='text-4xl font-bold text-center text-gray-800 mt-48 mb-16'
            >
                Pricing
            </h1>
            <Box
                sx={{
                    width: '100%',
                    // display: 'grid',
                    // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    // gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    gap: 4,
                    margin: 'auto',
                }}
            >
                <Card size="lg" variant="outlined">
                    {/* <Chip size="sm" variant="outlined" color="neutral">
                        BASIC
                    </Chip> */}
                    <div className='mt-4'></div>
                    <Typography level="h2">Basic</Typography>
                    <Divider inset="none" />
                    <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            0-300 students
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Lifitime access
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Download Result
                        </ListItem>
                    </List>
                    <Divider inset="none" />
                    <CardActions>
                        <Typography level="title-lg" sx={{ mr: 'auto' }}>
                            ₹ 35 {' '}
                            <Typography fontSize="sm" textColor="text.tertiary">
                                / page
                            </Typography>
                        </Typography>
                        <div className='w-16'></div>
                        <Button
                            variant="soft"
                            color="neutral"
                            endDecorator={<KeyboardArrowRight />}
                        >
                            Start now
                        </Button>
                    </CardActions>
                </Card>
                <Card
                    size="lg"
                // variant="solid"
                // color="neutral"
                // invertedColors
                // sx={{ bgcolor: 'neutral.900' }}
                >
                    <Chip size="sm" variant="outlined">
                        MOST POPULAR
                    </Chip>
                    <Typography level="h2">Startup</Typography>
                    <Divider inset="none" />
                    <List
                        size="sm"
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            mx: 'calc(-1 * var(--ListItem-paddingX))',
                        }}
                    >
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            301-600 students
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Lifitime access
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Download Result
                        </ListItem>
                    </List>
                    <Divider inset="none" />
                    <CardActions>
                        <Typography level="title-lg" sx={{ mr: 'auto' }}>
                                ₹30 {' '}
                            <Typography fontSize="sm" textColor="text.tertiary">
                                / page
                            </Typography>
                        </Typography>
                        <div className='w-16'></div>
                        <Button endDecorator={<KeyboardArrowRight />} className='!bg-[#08823F]'>Start now</Button>
                    </CardActions>
                </Card>
                <Card size="lg" variant="outlined">
                    {/* <Chip size="sm" variant="outlined" color="neutral">
                        BASIC
                    </Chip> */}
                    <div className='mt-4'></div>
                    <Typography level="h2">Premium</Typography>
                    <Divider inset="none" />
                    <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            600+ students
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Lifitime access
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Download Result
                        </ListItem>
                    </List>
                    <Divider inset="none" />
                    <CardActions>
                        <Typography level="title-lg" sx={{ mr: 'auto' }}>
                            ₹ 25 {' '}
                            <Typography fontSize="sm" textColor="text.tertiary">
                                / page
                            </Typography>
                        </Typography>
                        <div className='w-16'></div>
                        <Button
                            variant="soft"
                            color="neutral"
                            endDecorator={<KeyboardArrowRight />}
                        >
                            Start now
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}


export { Pricing };
