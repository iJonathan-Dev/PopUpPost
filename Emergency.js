let CategoryId;

const Slug = "Announcements";

const elementId = "Announcements";

const Hide = () => {
  const element = document.getElementById(elementId);
  element.style.display = "none";
  //console.log("element is hidden");
};

const StoreSession = () => {
  Hide();
  sessionStorage.setItem("elementHidden", "true");
  //console.log("Post is hidden during this session");
};

const Show = () => {
  const element = document.getElementById(elementId);
  element.style.display = "block";
  //console.log("element is shown");
};

//check if there's any post with that categories ID, show the pop-up box if yes
const checkPost = () => {
  fetch(`/wp-json/wp/v2/posts?categories=${CategoryId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0 && sessionStorage.getItem("elementHidden") !== "true") {
        //console.log("There are posts with the specified category.");
        Show();
        //console.log(data[0].title.rendered);
      } else {
        //console.log("No posts found in the specified category.");
        Hide();
      }
    })
    .catch((error) => console.error("Error fetching posts:", error));
};

Hide();

//check if Post with specified categories(slug) exist, then get the category ID & run checkPost function
fetch(`/wp-json/wp/v2/categories?slug=${Slug}`)
  .then((response) => response.json())
  .then((data) => {
    CategoryId = data[0].id;
    //console.log(CategoryId);
    checkPost();
  })
  .catch((error) => console.error("Error getting Slug ID:", error));

//Hide post when user click the close button
document.getElementById("closeBtn").onclick = StoreSession;

//Hide post when user click "Read More" on the post
const PostReadMore = document.getElementById("contentPost").querySelector(".elementor-post__read-more");
PostReadMore.onclick = StoreSession;
