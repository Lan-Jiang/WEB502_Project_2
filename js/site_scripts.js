// /* Create partners images js */
// var photoList = ["bustour", "cabinrental", "campingadv", "collegetours", "rentalbike", "tourgroup"];
// var photos = [];
// var fileNames = [];
// var imageList = [];
// var image;
// var openList = "<li class='partner'>";
// var closeList = "</li>";

// //Create a loop to create 6 images
// for (var i=0; i<6; i++) {
//     fileNames.push("partner-" + photoList[i]);
//     photos.push("<img src = 'images/partners/" +fileNames[i]+ ".png' >");//  
//     image = openList + photos[i] + closeList;
//     imageList.push(image);

//     //Display 6 images from array
//     document.getElementById("partners").innerHTML = imageList.join(" ");
// }