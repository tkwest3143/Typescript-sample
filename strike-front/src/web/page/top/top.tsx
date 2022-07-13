import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MessageService from "../../service/messageService";
import { NewsService } from "../../service/news/newsService";
import { AuthContext } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { NewsModel } from "../../model";
function Top() {
  const authContext = useContext(AuthContext);
  const [newsList, setNewsList] = useState<NewsModel[]>([]);

  const navigate = useNavigate();
  const newsService = new NewsService();

  useEffect(() => {
    onUpdateClickHandler();
  }, []);
  const onUpdateClickHandler = async () => {
    if (!authContext.authData || !authContext.authData.authUser) {
      navigate("/login");
      return;
    }
    const newsData = await newsService.getNewsData(
      authContext.authData.authUser.user_id
    );
    console.log(newsData.news_list);
    console.log(newsData.news_list[0].pubDate);
    setNewsList(newsData.news_list);
  };

  return (
    <div>
      <Box color="primary">
        <h2>Welcome to </h2>
      </Box>
      <Grid container spacing={3}>
        {newsList.map((news) => (
          <Grid item xs={3}>
            <Card sx={{ m: 4 }}>
              <CardMedia
                component="img"
                height="140"
                image={news.image}
                alt={news.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {news.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {news.description} ...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" target="_blank" href={news.link}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box>
        <Button onClick={onUpdateClickHandler}>
          {MessageService.Messages.text.register}
        </Button>
      </Box>
    </div>
  );
}

export default Top;
