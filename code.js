javascript:x=document.createElement("script");x.src="//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"; void document.getElementsByTagName("head")[0].appendChild(x);


var User = document.getElementsByClassName('ignore-react-onclickoutside user-info')[0].children[1].textContent;
var NumberOfPages = 0;
var NumStart = 0;
var page = 1;
var followers = [];
var Numbersend = 0;

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getData() {
  if (window.jQuery) {
    if (NumberOfPages == 0) {
      window.jQuery.ajax({
        url: 'https://scratch.mit.edu/users/' + User + '/followers/?page=' + page,
        success: function(data, status) {
          var $dom = window.jQuery(data);
          var $users = $dom.find('span.title').children();
          var $out = $('#result');
          for (var i = 0; i < $users.length; i += 1) {
            var user = $users[i].text.trim();
            console.log(user);
            followers.push(user)
          }
          page += 1;
          console.log(followers);
          getData()
        },
        error: function(jqXHR, textStatus, errorThrown) {
          NumberOfPages = 1;
          alert("Starting to send invites!");
          page += 1;
          console.log(page);
          getData()
        }
      })
    } else {
      var addUser = followers[Numbersend + NumStart];
      window.jQuery.ajax({
        url: 'https://scratch.mit.edu/site-api/users/curators-in/' + StudioNum + '/invite_curator/?usernames=' + addUser,
        Connection: close,
        type: 'PUT',
        headers: {
          "X-Requested-With": 'XMLHttpRequest',
          "X-CSRFToken": getCookie('scratchcsrftoken'),
        },
        success: function() {
          if ((Numbersend + NumStart) < followers.length) {
            Numbersend += 1;
            console.log(Numbersend + NumStart);
            setTimeout(() => getData(), 1000)
          } else {
            alert("Done!")
          }
        },
        error: function() {
          if ((Numbersend + NumStart) < followers.length) {
            Numbersend += 1;
            console.log(Numbersend + NumStart);
            setTimeout(() => getData(), 1000)
          } else {
            alert("Done!")
          }
        }
      })
    }
  } else {
    setTimeout(function() {
      getData()
    }, 10);
  }
}



var StudioNum = location.pathname;
StudioNum = StudioNum.slice(9, 17);
if (parseInt(StudioNum)) {
  getData()
} else {
  alert('Please Run This Script In The Studio That You Want To Send Your Invites In.');
}
