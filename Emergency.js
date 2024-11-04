let categoryId;

const slug = "Announcements";

const elementId = "Announcements";

const Hide = () => {
  const element = document.getElementById(elementId);
  element.style.display = "none";
  console.log("element is hidden");
};

const StoreSession = () => {
  Hide();
  sessionStorage.setItem("elementHidden", "true");
  console.log("Post is hidden during this session");
};

const Show = () => {
  const element = document.getElementById(elementId);
  element.style.display = "block";
  console.log("element is shown");
};

const checkPost = () => {
  fetch(`/wp-json/wp/v2/posts?categories=${categoryId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0 && sessionStorage.getItem("elementHidden") !== "true") {
        console.log("There are posts with the specified category.");
        Show();
        console.log(data[0].title.rendered);
      } else {
        console.log("No posts found in the specified category.");
        // Do something else if no posts are found
        Hide();
      }
    })
    .catch((error) => console.error("Error fetching posts:", error));
};

Hide();

fetch(`/wp-json/wp/v2/categories?slug=${slug}`)
  .then((response) => response.json())
  .then((data) => {
    categoryId = data[0].id;
    console.log(categoryId);
    checkPost();
  })
  .catch((error) => console.error("Error getting Slug ID:", error));

document.getElementById("closeBtn").onclick = StoreSession;
