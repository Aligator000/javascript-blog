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
const optArticleTagsSelector = '.post-tags .list'; // list ul with tags
const optArticleAuthorSelector = 'div .post-author'; //an authors of an article
const optTagsListSelector = '.tags.list'; //sidebar wih tags names
const optCloudClassCount = 5;
const optCloudClassPrefix  = 'tag-size-';
const optAuthorListSelector = '.authors .list';
const optAuthorCloudClassPrefix  = 'author-size-';

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
    const tagLink = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(tagLink);

    titleList.insertAdjacentHTML('beforeend', tagLink);

    /* [DONE] insert link into titleList */
    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
}
generateTitleLinks();

function calculateTagsParams(tags){
  const params = {min: 10, max: 0};
  for(let tag in tags){
    console.log(tag + 'is used '+ tags[tag] + 'times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  console.log(params);
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  console.log(classNumber);
  return classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty obejct */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  /* [DONE] find tags wrapper */
  for (let article of articles){
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

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
    }
  }
  //tagWrapper.innerHTML = innerHTML;
  /* [DONE] END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  console.log(allTags);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /*[NEW] generate cde of a link and add it to allTagsHTML */

    const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) +'" href ="#tag-' + tag + '">' + tag + '</a></li> ';
    console.log('taglinkHTM:', tagLinkHTML);

    allTagsHTML += tagLinkHTML;
    console.log(allTagsHTML);
  }

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
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

function calculateTagsParams(authors){
  const params = {min: 10, max: 0};
  for(let author in authors){
    console.log(author + 'is used '+ authors[author] + 'times');
    if(authors[author] > params.max){
      params.max = authors[author];
    }
    if(authors[author] < params.min){
      params.min = authors[author];
    }
  }
  console.log(params);
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  console.log(classNumber);
  return classNumber;
}

function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* [DONE] find all articles */
  const authorArticles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(let authorArticle of authorArticles){
  /* [DONE] find author wrapper */
    const authorWrapper = authorArticle.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);

    /* [DONE] make html variable with empty string */
    let innerHTML = '';

    /* [DONE] get authors from from data-authors attribute */
    const articleAuthor = authorArticle.getAttribute('data-author');
    console.log(articleAuthor);

    /* [DONE] generate HTML of the link */
    const authorLink = '<a href="#author-' + articleAuthor + '">'+ articleAuthor +'</a>';
    console.log(authorLink);

    /* [DONE] insert HTML of all the links into the author wrapper */
    //authorWrapper.insertAdjacentHTML('afterend', authorLink);
    /* [DONE] add generated code to html variable */
    innerHTML = innerHTML + authorLink;

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
    /* [NEW] add generated code to allAuthors array */
      allAuthors[articleAuthor] =1;
    } else {
      allAuthors[articleAuthor]++;
    }
    //authorWrapper.innerHTML = innerHTML;
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector('.authors');
  /* [NEW] add html from allAuthors to authorList */
  //authorList.innerHTML = allAuthors.join(' ');
  console.log(allAuthors);

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  const authorParams = calculateTagsParams(allAuthors);
  console.log('authorParams:', authorParams);

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){

    /*[NEW] generate code of a link and add it to authorLinkHTML */
    const authorLinkHTML = '<li><a class="author-size-' + calculateTagClass(allAuthors[author], authorParams) +'" href ="#author-' + author + '">' + author + '</a></li> ';
    console.log('authorLinkHTML:', authorLinkHTML);

    allAuthorsHTML += authorLinkHTML;
    console.log(allAuthorsHTML);
  }
  /* [NEW] add html from allTagsHTML to tagList */
  authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();


function authorClickHandler(event){
  /* [DONE] prevent default action for this event */
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const hrefAuthor = clickedElement.getAttribute('href');
  console.log(hrefAuthor);

  /* make a new constant "autor" and extract author from the "href" constant */
  const author = hrefAuthor.replace('#author-', '');

  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authorLinks);

  /* START LOOP: for each active author link */
  for(let authorLink of authorLinks){
    /* [DONE] remove class active */
    authorLink.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
    console.log('active tag removed');
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const allAuthors = document.querySelectorAll('a[href="' + hrefAuthor + '"]');
  console.log(allAuthors);

  /* START LOOP: for each found author link */
  for(let allAuthor of allAuthors){
    /* [DONE] add class active */
    allAuthor.classList.add('active');
    console.log('allAuthor',allAuthor);
  }
  /* END LOOP: for each found author link */
  generateTitleLinks('[data-author~="' + author + '"]');
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('[href^="#author-"]');

  /* START LOOP: for each link */
  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
