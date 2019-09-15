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

function generateTitleLinks() {

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  /* [DONE] get the article id */
  const articles = document.querySelectorAll(optArticleSelector);

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
    tagWrapper.innerHTML = ' ';
    console.log(tagWrapper);

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
      tagWrapper.insertAdjacentHTML('beforeend', tagLink);
      /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] END LOOP: for every article: */
  }
}
generateTags();

