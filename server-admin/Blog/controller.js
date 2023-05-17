const pool = require('../db');

// Get all carousel 
const getListBlog = async (req, res) => {
   const keyWord = req.query.key_word;
     try {
      if (keyWord) {
         const searchQuery = `SELECT * FROM blogs WHERE title_blog ILIKE '%' || $1 || '%'`;
   
         const blogsSearch = await pool.query(searchQuery, [keyWord.trimStart()]);
   
         res.status(200).json(blogsSearch.rows);
       } else {
         const listBlog = await pool.query("SELECT * FROM blogs");
        res.status(200).json(listBlog.rows)
       }
        
     } catch (error) {
        res.status(400).json("Error")
     }

}

//Add blog

const addBlog = async (req, res) => {
   const url = req.protocol + "://" + req.get("host");
   const data = req.body;
   try {
     const newBlog = await pool.query(
       "INSERT INTO blogs(title_blog, description_blog, image_blog , author_blog, time_release) values($1, $2 , $3 , $4, $5) RETURNING *",
       [
         data.title_blog,
         data.description_blog,
         req.file ? url + "/public/" + req.file.filename : null,
         data.author_blog,
         data.time_release,
       ]
     );
 
     if (!newBlog.rows[0]) {
       return;
     }
 
     const listBlog = await pool.query("SELECT * FROM sliders");
 
     res.status(200).json(listBlog.rows);
   } catch (error) {
     res.status(400).json("Error");
   }
 };

 const getDetail = async (req, res) => {
   const { id } = req.params;
   try {
     const carousel = await pool.query(
       "SELECT * FROM blogs WHERE id = $1",
       [id]
     );
     res.status(200).json(carousel.rows[0]);
   } catch (error) {
     res.status(400).json("Error");
   }
 };

 const updateBlog = async (req, res) => {
   const url = req.protocol + "://" + req.get("host");
   const data = req.body;
   const { id } = req.params;

   try {
     const selectBlog = await pool.query(
       "SELECT * FROM blogs WHERE id = $1",
       [id]
     );
 
     if (!selectBlog.rows[0]) {
       return;
     }

     console.log(selectBlog.rows[0]);

     const updateBlog = await pool.query(
       "UPDATE blogs SET title_blog = $1, description_blog = $2, image_blog = $3, author_blog =$4, time_release=$5 WHERE id = $6 RETURNING *",
       [
         data.title_blog,
         data.description_blog,
         req.file
           ? url + "/public/" + req.file.filename
           : selectBlog.rows[0].image_blog,
         data.author_blog,
         data.time_release,
         id,
       ]
     );
 
     if (!updateBlog.rows[0]) {
       return;
     }
 
     const listBlog = await pool.query("SELECT * FROM blogs");
 
     res.status(200).json(listBlog.rows);
   } catch (error) {
     res.status(400).json("Error");
   }
 };


 const deleteBlog = async (req, res) => {
   const { id } = req.params;
   try {
     const deleteItem = await pool.query(
       "DELETE FROM blogs WHERE id = $1 RETURNING *",
       [id]
     );
 
     if (!deleteItem.rows[0]) {
       return;
     }
 
     const listBlog = await pool.query("SELECT * FROM blogs");
 
     res.status(200).json(listBlog.rows);
   } catch (error) {
     res.status(400).json("Error");
   }
 };
 



module.exports = {
     getListBlog,
     addBlog,
     getDetail,
     updateBlog,
     deleteBlog
}