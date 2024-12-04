import "./songs.css"
import { Card, CardContent, Typography } from '@mui/material';
function Songs() {
    return (
        <div id="songs">
            <Card class="card">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Song 1
                    </Typography>
                    <Typography color="text.secondary">
                        Artist 1
                    </Typography>
                </CardContent>
            </Card>
            <Card class="card">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Song 1
                    </Typography>
                    <Typography color="text.secondary">
                        Artist 1
                    </Typography>
                </CardContent>
            </Card>
            <Card class="card">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Song 1
                    </Typography>
                    <Typography color="text.secondary">
                        Artist 1
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Songs