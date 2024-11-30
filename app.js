$(function () {
  //Your Code Here

  let currentId = 1


  const getUser = async (id) => {
    await $.ajax({
      url: `https://dummyjson.com/users/${id}`,
      type: 'GET',
      success: function (response) {
        const data = response
        console.log(data)
        $(".info__content").html('')
        $(".info__content").append(`<h1>${data.firstName + " " + data.lastName}</h1>`)
        $(".info__content").append(`<p>${"Age:" + " " + data.age}</p>`)
        $(".info__content").append(`<p>${"Email:" + " " + data.email}</p>`)
        $(".info__content").append(`<p>${"Phone:" + " " + data.phone}</p>`)
        $(".info__image > img").attr("src", data.image)
        $(".posts > h3").text(data.firstName + "'s" + " " + "Posts")
        $(".todos > h3").text(data.firstName + "'s" + " " + "To" + " " + "Dos")


      },
      error: function (error) {

      }
    })
  }



  const getUserPosts = async (id) => {
    await $.ajax({
      url: `https://dummyjson.com/users/${id}/posts`,
      type: 'GET',
      success: function (response) {
        const data = response
        console.log(data.posts.length)
        $(".posts > ul").html('')
        if (data.posts.length) {
          data.posts.forEach(element => {
            console.log();

            $(".posts > ul").append(`<li>
              
              <h4 class="${element.id}">
              ${element.title} 
              </h4>
              <span>${element.body}</span>
              
              </li>`)
          })

          $('.posts h4').on('click', function () {
            console.log("click")
            const postId = $('.posts h4').attr("class")

            $("body").append(`<div class="overlay"></div>`)

            getPostDetail(postId)







            //https://dummyjson.com/posts/${postid}
          })

        } else {
          $(".posts > ul").append(`<li>
          User has no posts</li>`)

        }

      },
      error: function (error) {

      }
    })
  }

  const getUserTodos = async (id) => {
    await $.ajax({
      url: `https://dummyjson.com/users/${id}/todos`,
      type: 'GET',
      success: function (response) {
        const data = response
        $(".todos > ul").html('')
        if (data.todos.length) {
          data.todos.forEach(element => {
            $(".todos> ul").append(`<li>${element.todo} </li>`)

          })
        } else {
          $(".todos > ul").append(`<li>
        User has no To Dos</li>`)

        }

        console.log(data)
      },
      error: function (error) {

      }
    })
  }

  const handleCloseModal = () => {
    $("body").remove(".overlay")
  }

  const getPostDetail = (id) => {

    $.ajax({
      url: `https://dummyjson.com/posts/${id}`,
      type: 'GET',
      success: function (response) {
        const data = response

        console.log(data)


        $(".overlay").append(`<div class="modal">
          
          <h3>${data.title}</h3>
          <p>${data.body}</p>
          <p>${"Views:" + " " + data.views}</p>
          <button class="buttonModal">Close</button>


          
          
          </div>`)

        $(".buttonModal").on("click", () => {
          $(".overlay").remove()

        })

      },
      error: function (error) {

      }
    })


  }






  $('header button:first-child').on('click', () => {
    //currentId -= 1
    console.log(currentId)

    if (currentId === 1) {
      currentId = 30
    } else {
      currentId--
      //getUser(currentId)
    }

    getUser(currentId)
    getUserPosts(currentId)
    getUserTodos(currentId)
  });

  $('header button:last-child').on('click', () => {
    if (currentId === 30) {
      currentId = 1;
    } else {
      currentId++;
    }
    getUser(currentId)
    getUserPosts(currentId)
    getUserTodos(currentId)
  });

  getUser(currentId)
  getUserPosts(currentId)
  getUserTodos(currentId)
})



