import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MessageService from "../../service/messageService";
import { NewsService } from "../../service/news/newsService";
import { AuthContext } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { NewsModel } from "../../model";
import { NewsCategoryModel } from "../../model/newsCategoryModel";
function News() {
  const authContext = useContext(AuthContext);
  const [newsList, setNewsList] = useState<NewsModel[]>([]);
  const [user, setUser] = useState<{ userId: string; username: string }>({
    userId: "",
    username: "",
  });
  const navigate = useNavigate();
  const newsService = new NewsService();

  useEffect(() => {
    if (!authContext.authData || !authContext.authData.authUser) {
      navigate("/login");
      return;
    }
    setUser({
      userId: authContext.authData.authUser.user_id,
      username: authContext.authData.authUser.username,
    });
    onUpdateClickHandler();
    setCategory();
  }, []);
  const onUpdateClickHandler = async () => {
    const newsData = await newsService.getNewsData(user.userId);
    setNewsList(newsData.news_list);
  };

  function allyProps(index: string) {
    return {
      id: `category-tab-${index}`,
      "aria-controls": `category-tabpanel-${index}`,
      value: index,
    };
  }

  const [newsCategory, setNewsCategory] = useState<NewsCategoryModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleChange = async (
    _event: React.SyntheticEvent,
    categoryId: string
  ) => {
    setSelectedCategory(categoryId);
    const newsData = await newsService.getNewsByCategory(categoryId);
    setNewsList(newsData.news_list);
  };
  const setCategory = async () => {
    const categoryRes = await newsService.getNewsCategory();
    setNewsCategory(categoryRes.news_category);
  };
  const CategoryTab = () => {
    return (
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedCategory}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {newsCategory.map((item) => {
            return (
              <Tab
                label={MessageService.NewsCategory(item.title)}
                {...allyProps(item.category_id)}
              />
            );
          })}
        </Tabs>
      </Box>
    );
  };

  return (
    <div>
      <Box color="primary" sx={{ display: "inline-flex" }}>
        <Button onClick={onUpdateClickHandler}>
          {MessageService.Messages.text.update}
        </Button>
      </Box>
      {CategoryTab()}
      <Grid container>
        <LinearProgress hidden={newsList.length === 0} />
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
                <Typography variant="body2" color="text.secondary" align="left">
                  {news.description} ...
                  <br />
                  <Box>
                    {MessageService.Messages.text.post_date} : {news.pubDate}
                  </Box>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" target="_blank" href={news.link}>
                  {MessageService.Messages.text.learn_more}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default News;
