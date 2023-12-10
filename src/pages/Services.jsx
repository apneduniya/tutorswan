import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';

function Services() {
    return (
        <>
            <h1
                className='text-4xl font-bold text-center text-gray-800 mt-48 mb-16'
            >
                Services
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
                <div className='min-w-[300px] border-[1.5px] border-[#CDD7E1] rounded-xl py-4 px-10 max-w-[500px]'>
                    <div className='mt-4'></div>
                    <Typography level="h2" textAlign="center">Accuracy</Typography>
                    <div className='mt-4'></div>
                    <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Our AI grading application is trained on a massive dataset of student work, which allows it to grade answers accurately and consistently.
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Our AI model is constantly being updated and improved, so you can be confident that your students are getting the most accurate feedback possible.
                        </ListItem>
                    </List>
                </div>
                <div className='min-w-[300px] border-[1.5px] border-[#CDD7E1] rounded-xl py-4 px-10 max-w-[500px]'>
                    <div className='mt-4'></div>
                    <Typography level="h2" textAlign="center">Efficiency</Typography>
                    <div className='mt-4'></div>
                    <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Our AI grading application can grade an assignment in seconds, freeing up your time to focus on other important tasks.
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            We offer a variety of features to help you manage your grading workflow more efficiently, such as bulk grading and automatic feedback.
                        </ListItem>
                    </List>
                </div>
                <div className='min-w-[300px] border-[1.5px] border-[#CDD7E1] rounded-xl py-4 px-10 max-w-[500px]'>
                    <div className='mt-4'></div>
                    <Typography level="h2" textAlign="center">Flexiblity</Typography>
                    <div className='mt-4'></div>
                    <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Our AI grading application can be used to grade a variety of different types of assignments, including essays.
                        </ListItem>
                        <ListItem>
                            <ListItemDecorator>
                                <Check />
                            </ListItemDecorator>
                            Our application is scalable to meet the needs of different educational institutions, from small schools to large universities.
                        </ListItem>
                    </List>
                </div>
            </Box>
        </>
    );
}


export { Services };
