import { FormGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { NewsService } from "../../service/news/newsService";
import { AuthContext } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { NewsCategoryModel } from "../../model/newsCategoryModel";
import Calendar from "./calendar";
function Management() {
  const authContext = useContext(AuthContext);
  const [newsCategory, setNewsCategory] = useState<NewsCategoryModel[]>([]);
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
    setCategory();
  }, []);
  const setCategory = async () => {
    const categoryRes = await newsService.getNewsCategory();
    console.log(categoryRes);
    setNewsCategory(categoryRes.news_category);
  };

  return (
    <div>
      <FormGroup>
        <Calendar year={2022} month={7} />
      </FormGroup>
    </div>
  );
}

export default Management;
