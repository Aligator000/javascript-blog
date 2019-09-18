'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
    console.log('active removed');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
    console.log('active article removed');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('targetArticle:', targetArticle);
}

const optArticleSelector = '.post'; //article class, for whole article
const optTitleSelector = '.post-title'; //h3, title o Aricle, eg. Article 1
const optTitleListSelector = '.titles'; //ul class, for all links/
const optArticleTagsSelector = '.post-tags .list'; // lista ul z tagami
const optArticleAuthorSelector = '.post-author'; //an authors of an article

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  /* [DONE] get the article id */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* [DONE] insert link into titleList */
    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
}
generateTitleLinks();

function generateTags(){

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  /* [DONE] find tags wrapper */
  for (let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    //tagWrapper.innerHTML = ' ';
    console.log(tagWrapper);

    let innerHTML = '';

    /* [DONE] make html variable with empty string */
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* [DONE] generate HTML of the link */
      const tagLink = '<li><a href="#tag-' + tag + '">'+ tag +'</a></li>';
      console.log(tagLink);

      /* [DONE] insert HTML of all the links into the tags wrapper */
      /* [DONE] add generated code to html variable */
      //tagWrapper.insertAdjacentHTML('beforeend', tagLink);

      innerHTML = innerHTML + tagLink;


      /* [DONE] END LOOP: for each tag */
    }

    tagWrapper.innerHTML = innerHTML;
    /* [DONE] END LOOP: for every article: */
  }

}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */

  /* make new constant named "clickedElement" and give it the value of "this" */
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinks);
  /* START LOOP: for each active tag link */

  /* remove class active */
  for (let tagLink of tagLinks){
    tagLink.classList.remove('active');
    console.log('active tag removed');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log(allTags);

  /* START LOOP: for each found tag link */
  /* add class active */
  for(let allTag of allTags){
    allTag.classList.add('active');
    console.log('allTag:', allTag);
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');

  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}

addClickListenersToTags();


function generateAuthors(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
  /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);

    /* [DONE] make html variable with empty string */
    let innerHTML = '';

    /* [DONE] get authors from from data-authors attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* [DONE] generate HTML of the link */
    const authorLink = '<p class="post-author">by <a href="# ' + articleAuthor + '">' + articleAuthor +'</a></p>';
    console.log(authorLink);

    /* [DONE] insert HTML of all the links into the tags wrapper */
    authorWrapper.insertAdjacentHTML('afterend', authorLink);

    /* [DONE] add generated code to html variable */
    innerHTML = innerHTML + authorLink;
  }
  /* END LOOP: for every article: */
}
generateAuthors()


//function authorClickHandler(event){
  /* prevent default action for this event */

  /* make new constant named "clickedElement" and give it the value of "this" */

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  /* make a new constant "autor" and extract author from the "href" constant */

  /* find all author links with class active */

  /* START LOOP: for each active author link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all author links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found author link */

    /* add class active */

  /* END LOOP: for each found author link */

  /* execute function "generateTitleLinks" with article selector as argument */
//}

//function addClickListenersToTags(){
  /* find all links to authors */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
//}

//addClickListenersToTags();
