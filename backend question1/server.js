const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const axios = require("axios");

app.use(cors());
let solution = [];
app.get("/categories/:categoryname/products", async (req, res) => {
  solution = [];
  const categoryName = req.params.categoryname;
  const companyNames = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  const top = req.query.top;
  let page = req.query.page;
  const resp = await axios.post("http://20.244.56.144/test/auth", {
    companyName: "DSATM",
    clientID: "aeadfcc8-667f-4fa9-aef3-d281584311b9",
    clientSecret: "OjdTBqTKQZYPBaaq",
    ownerName: "Vinayak Nawdhar",
    ownerEmail: "vinayaknawdhar003@gmail.com",
    rollNo: "1DT21CS180",
  });
  let count = 1;
  for (let i = 0; i < companyNames.length; i++) {
    try {
      const ans = await axios.get(
        `http://20.244.56.144/test/companies/${companyNames[i]}/categories/${categoryName}/products?top=${top}&minPrice=1&maxPrice=10000`,
        {
          headers: {
            Authorization: `Bearer ${resp.data.access_token}`,
          },
        }
      );
      ans.data.forEach((element) => {
        (element.company_name = companyNames[i]), (element.id = count);
        count++;
      });
      solution.push(ans.data);
    } catch (e) {
      console.log(e);
    }
  }
  solution = solution.flat();
  if (solution.length > 10) {
    if (!page) {
      res.json({ message: "items more than 10,please add page query" });
    } else {
      if (page == 0) {
        res.json({ error: "page cannot be 0, start from 1" });
      }
      const responseToBeSent = [];
      page = page - 1;
      for (let i = page * 10; i < page * 10 + 10; i++) {
        responseToBeSent.push(solution[i]);
      }
      res.json({
        totalPages: Math.floor(solution.length / 10),
        data: responseToBeSent,
      });
    }
  } else {
    res.json(solution);
  }
});
app.get("/categories/:categoryname/products/:productid", async (req, res) => {
  const categoryName = req.params.categoryname;
  const productid = req.params.productid;
  if (solution.length == 0) {
    res.redirect(`/categories/${categoryName}/products?top=100`);
  } else {
    responseToBeSent = solution.filter((elem) => elem.id == productid);
    res.json(responseToBeSent);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
