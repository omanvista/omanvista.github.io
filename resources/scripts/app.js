
// variables
const metaDescription = document.querySelector('meta[name="description"]');
const app = document.getElementById("app");
const loader = document.querySelector(`.loader-wrapper`);

let isBusinessNameValid; //use for business validity checker

let username = "";
let businessInfo;
let businessesList;
let countries = [];
let cities = [];
let categories = [];
let searchFilter = "";
let defaultBusinessCards;
let defaultCheckBox;
let categoriesDrobDownVar;
let locationsDrobDownVar;
// page loader
window.onload = function () {
  loader.style.display = "none";
};


async function renderPage(pathname) {
  switch (pathname) {
    case "/":
      homePage();
      break;
    case "/businesses-explorer":
      fetchBusinessExplorer();
      break;
    // Add more cases for other paths
    default:
      await businessUsernamesChecker(pathname);
    // app.innerHTML = "<h1>404 - Not Found</h1>";
  }
}

function navigate() {
  const pathname = window.location.pathname.toLowerCase();
  renderPage(pathname);
}
// Listen to changes in the URL
window.addEventListener("popstate", navigate);
navigate();

// read each business info from API
async function fetchBusinessInformation() {
  let data;
  try {
    const response = await fetch(
      `resources/businesses/${username}/information/en.json`
    );
    if (response) {
      data = await response.json();
    } else {
      console.log("we have error");
    }
    businessInfo = data;
    businessPageMaker();
    // return data;
  } catch (error) {
    // You can handle errors or return a default value here if needed
    return error;
  }
  businessPageMaker();
}

//business page maker function
function businessPageMaker() {
  // header //////////////////////////////////////////////////////
  app.innerHTML = `
      <main class="main-business" id="main-business">
        <!-- header -->
        <div class="header-content">
          <figure class="header-profile">
            <img
              class="header-profile-logo"
              src="resources/images/logo-profile.svg"
              alt="linkedivo"
            />
            <figcaption>
              <h1 class="business-name">Linkedivo</h1>
              <h2 class="business-field">Where Connection Happen</h2>
            </figcaption>
          </figure>

          <div class="header-contact">
            <div class="contact-item">
              <i class="fa fa-map-marker-alt"></i>
              <p class="header-info-location">Canada | Toronto</p>
            </div>
            <div class="contact-item">
              <i class="fa fa-globe"></i>
              <a class="header-info-website" href="https://linkedivo.com"
                >www.linkedivo.com</a
              >
            </div>
            <div class="contact-item">
              <i class="fa fa-phone"></i>
              <a class="header-info-phone" href="tel:+12137720805"
                >+1 213 772 0805</a
              >
            </div>
            <div class="contact-item">
              <i class="fa fa-envelope"></i>
              <a class="header-info-email" href="mailto:info@linkedivo.com"
                >info@linkedivo.com</a
              >
            </div>
          </div>
          <div class="header-tools">
            <div class="header-qr-code">
              <img
                class="header-qr-code-img"
                src="resources/businesses/navan/images/navan-qr-code.svg"
                alt="linkedivo qr code"
              />
            </div>
            <div class="header-quick-access">
              <i class="fa fa-bookmark"></i>
              <!-- <i class="fa-regular fa-bookmark"></i> -->
              <i class="fa fa-share-alt"></i>
              <i class="fa fa-user-plus"></i>
            </div>
          </div>
        </div>

        <!-- business nav -->
        <nav class="business-nav">
          <ul>
            <li class="nav-overview header-nav-selected">
              <a href="#">Overview</a>
            </li>
            <li class="nav-services">
              <a href="#">Services</a>
            </li>
            <li class="nav-contact">
              <a href="#">Contact</a>
            </li>
            <li class="nav-gallery">
              <a href="#">Gallery</a>
            </li>
            <li class="nav-more-info">
              <a href="#">More Info</a>
            </li>
          </ul>
        </nav>

        <!-- main content -->
        <div class="main-contents">
          <!-- overview -->
          <div class="main-overview"></div>

          <!-- services -->
          <div class="main-services"></div>

          <!-- contacts -->
          <div class="main-contacts">
            <div class="contact-info box-shadow">
              <div class="contact-info-details">
                <h3 class="office-title">Main Office</h3>
              </div>

              <div class="contact-info-map">
                <iframe
                  src=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <!-- Gallery -->
          <div class="main-gallery"></div>

          <!-- More Info -->
          <div class="main-more-info"></div>
        </div>
      </main>`;

  const headerProfileLogo = document.querySelector(`.header-profile-logo`);
  const businessName = document.querySelector(`.business-name`);
  const businessField = document.querySelector(`.business-field`);

  const headerInfoLocation = document.querySelector(`.header-info-location`);
  const headerInfoWebsite = document.querySelector(`.header-info-website`);
  const headerInfoPhone = document.querySelector(`.header-info-phone`);
  const headerInfoEmail = document.querySelector(`.header-info-email`);

  const headerQrCode = document.querySelector(`.header-qr-code-img`);

  const overview = document.querySelector(`.main-overview`);
  const services = document.querySelector(`.main-services`);
  const contacts = document.querySelector(`.contact-info-details`);
  const mapIframe = document.querySelector(`.contact-info-map iframe`);
  const gallery = document.querySelector(`.main-gallery`);
  const moreInfo = document.querySelector(`.main-more-info`);

  const addToContact = document.querySelector(`.fa-user-plus`);


  metaDescription.setAttribute("content", businessInfo.info.metaDescription);
  document.title = `${businessInfo.info.name} | ${businessInfo.info.slogan}`;

  businessName.innerHTML = businessInfo.info.name;
  headerProfileLogo.setAttribute(
    "src",
    `resources/businesses/${username}/images/${username}-logo.png`
  );
  headerProfileLogo.setAttribute("alt", `${businessInfo.info.name} logo`);
  businessField.innerHTML = businessInfo.info.slogan; // need to change

  headerInfoLocation.innerHTML = `${businessInfo.info.country} | ${businessInfo.info.city}`;

  headerInfoWebsite.setAttribute("href", businessInfo.info.url);
  headerInfoWebsite.innerHTML = `www.${businessInfo.info.url.split("//")[1]}`;

  headerInfoEmail.setAttribute("href", `mailto:${businessInfo.info.email}`);
  headerInfoEmail.innerHTML = businessInfo.info.email;

  headerInfoPhone.setAttribute("href", `tel:${businessInfo.info.phone}`);
  headerInfoPhone.innerHTML = businessInfo.info.phone;

  headerQrCode.setAttribute(
    "src",
    `resources/businesses/${username}/images/${username}-qr-code.svg`
  );
  headerQrCode.setAttribute("alt", `${businessInfo.info.name} QR code`);

  addToContactFunc(addToContact, businessInfo.info.name, businessInfo.info.email, `https://omanvista.com/${businessInfo.info.userName}`, businessInfo.info.phone);

  const modalShareLink = document.querySelector(`.fa-share-alt`);
  modalShareLink.addEventListener('click', function () {
    modalShareInfoHandler(`https://omanvista.com/${businessInfo.info.userName}`);
  });

  const bookmark = document.querySelector(`.fa-bookmark`);
  bookmark.addEventListener('click', function () {
    notification('This option will be available in next version');
  })



  // header business navigation bar
  businessNavMaker();


  // body //////////////////////////////////////////////////////
  // overview
  // summary
  if (businessInfo.overview.mission) {
    overview.innerHTML += `<div class="overview-card details-card box-shadow">
            <h2 class="summary-title">Executive Summary</h2>
            <p class="summary-description">
            ${businessInfo.overview.summary}
            </p>
            </div>`;
  }
  // mission
  if (businessInfo.overview.mission) {
    overview.innerHTML += `
            <div class="overview-card details-card box-shadow">
            <h2 class="mission-title">Mission</h2>
            <p class="mission-description">
            ${businessInfo.overview.mission}
            </p>
            </div>`;
  }
  // vision
  if (businessInfo.overview.vision) {
    overview.innerHTML += `
            <div class="overview-card details-card box-shadow">
            <h2 class="vision-title">Vision</h2>
            <p class="vision-description">
            ${businessInfo.overview.vision}
            </p>
            </div>`;
  }
  // values
  if (businessInfo.overview.values) {
    overview.innerHTML += `
            <div class="overview-card details-card box-shadow">
            <h2 class="values-title">Values</h2>
            <p class="values-description">
            ${businessInfo.overview.values}
            </p>
            </div>`;
  }

  // services
  Object.keys(businessInfo.services).forEach((key) => {
    services.innerHTML += `<div class="service-card box-shadow">
            <div class="service-info">
                <h3>${businessInfo.services[key].title}</h3>
                <p>
                    ${businessInfo.services[key].description};
                </p>
            </div>
            <div class="service-img">
                <img src='resources/businesses/${username}/images/${key}.svg' alt="${username}-${businessInfo.services[key].title}" />
            </div>
        </div>`;
  });

  //contacts
  //address
  if (businessInfo.contacts.address) {
    contacts.innerHTML += `
          <div class="contacts-address info-details-card">
                <i class="fa fa-map-marker-alt"></i>
                <p>${businessInfo.contacts.address}</p>
              </div>`;
  }
  // phone
  if (businessInfo.contacts.phone) {
    contacts.innerHTML += `
            <div class="contacts-phone info-details-card">
        <i class="fa fa-phone"></i>
        <a href="tel:${businessInfo.contacts.phone}">${businessInfo.contacts.phone}</a>
    </div>`;
  }
  // website
  if (businessInfo.contacts.website) {
    contacts.innerHTML += `
              <div class="contacts-phone info-details-card">
                <i class="fa fa-globe"></i>
                <a href="${businessInfo.contacts.website}">www.${businessInfo.contacts.website.split("//")[1]
      }</a>
              </div>`;
  }
  // email
  if (businessInfo.contacts.email) {
    contacts.innerHTML += `
              <div class="contacts-email info-details-card">
                <i class="fa fa-envelope"></i>
                <a href="mailto:${businessInfo.contacts.email}">${businessInfo.contacts.email}</a>
              </div>`;
  }
  //Social Media
  if (businessInfo.contacts.socialMedia) {
    contacts.innerHTML += `<div class="contacts-social-media info-details-card"></div>`;
  }
  const socialMedia = document.querySelector(`.contacts-social-media`);

  //instagram
  if (businessInfo.contacts.socialMedia.instagram) {
    socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.instagram}">
                  <i class="fab fa-instagram"></i>
                </a>`;
  }
  //facebook
  if (businessInfo.contacts.socialMedia.facebook) {
    socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.facebook}">
                  <i class="fab fa-facebook"></i>
                </a>`;
  }
  //linkedin
  if (businessInfo.contacts.socialMedia.linkedin) {
    socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.linkedin}">
                  <i class="fab fa-linkedin"></i>
                </a>`;
  }
  //whatsapp
  if (businessInfo.contacts.socialMedia.whatsapp) {
    socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.whatsapp}">
                  <i class="fab fa-whatsapp"></i>
                </a>`;
  }
  //telegram
  if (businessInfo.contacts.socialMedia.telegram) {
    socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.telegram}">
                  <i class="fab fa-telegram"></i>
                </a>`;
  }
  //youtube
  if (businessInfo.contacts.socialMedia.youtube) {
    socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.youtube}">
                  <i class="fab fa-youtube"></i>
                </a>`;
  }
  //twitter
  if (businessInfo.contacts.socialMedia.twitter) {
    socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.twitter}">
                  <i class="fab fa-twitter"></i>
                </a>`;
  }
  // google map
  if (businessInfo.contacts.googleMap) {
    mapIframe.setAttribute(`src`, businessInfo.contacts.googleMap);
  }

  // console.log(businessInfo.moreInfo)

  // gallery
  Object.keys(businessInfo.gallery).forEach((key) => {
    gallery.innerHTML += `        
        <div class="gallery-card box-shadow">
            <div class="gallery-info">
              <h3>${businessInfo.gallery[key].title}</h3>
              <p>
               ${businessInfo.gallery[key].description}
              </p>
            </div>
            <div class="gallery-img">
                <img src='resources/businesses/${username}/images/${key}.svg' alt="${username}-${businessInfo.gallery[key].title}" /> 
            </div>
          </div>`;
  });

  //more info
  Object.keys(businessInfo.moreInfo).forEach((key) => {
    moreInfo.innerHTML += `   
         <div class="more-info-card">
            <a href="${businessInfo.moreInfo[key].link}"
            >- ${businessInfo.moreInfo[key].title}</a>
        </div>`;
  });
}

// header nav business maker
function businessNavMaker() {
  // variables
  const navOverview = document.querySelector(`.nav-overview`);
  const navServices = document.querySelector(`.nav-services`);
  const navContact = document.querySelector(`.nav-contact`);
  const navGallery = document.querySelector(`.nav-gallery`);
  const navMoreInfo = document.querySelector(`.nav-more-info`);

  const mainOverview = document.querySelector(`.main-overview`);
  const mainServices = document.querySelector(`.main-services`);
  const mainContact = document.querySelector(`.main-contacts`);
  const mainGallery = document.querySelector(`.main-gallery`);
  const mainMoreInfo = document.querySelector(`.main-more-info`);

  // header nav menu selection

  mainOverview.style.display = `block`;
  mainServices.style.display = `none`;
  mainContact.style.display = `none`;
  mainGallery.style.display = `none`;
  mainMoreInfo.style.display = `none`;

  navOverview.classList.add(`header-nav-selected`);
  navServices.classList.remove(`header-nav-selected`);
  navContact.classList.remove(`header-nav-selected`);
  navGallery.classList.remove(`header-nav-selected`);
  navMoreInfo.classList.remove(`header-nav-selected`);

  navOverview.addEventListener("click", (event) => {
    event.preventDefault();
    mainOverview.style.display = `block`;
    mainServices.style.display = `none`;
    mainContact.style.display = `none`;
    mainGallery.style.display = `none`;
    mainMoreInfo.style.display = `none`;

    navOverview.classList.add(`header-nav-selected`);
    navServices.classList.remove(`header-nav-selected`);
    navContact.classList.remove(`header-nav-selected`);
    navGallery.classList.remove(`header-nav-selected`);
    navMoreInfo.classList.remove(`header-nav-selected`);
  });

  navServices.addEventListener("click", (event) => {
    event.preventDefault();
    mainOverview.style.display = `none`;
    mainServices.style.display = `block`;
    mainContact.style.display = `none`;
    mainGallery.style.display = `none`;
    mainMoreInfo.style.display = `none`;

    navOverview.classList.remove(`header-nav-selected`);
    navServices.classList.add(`header-nav-selected`);
    navContact.classList.remove(`header-nav-selected`);
    navGallery.classList.remove(`header-nav-selected`);
    navMoreInfo.classList.remove(`header-nav-selected`);
  });

  navContact.addEventListener("click", (event) => {
    event.preventDefault();
    mainOverview.style.display = `none`;
    mainServices.style.display = `none`;
    mainContact.style.display = `block`;
    mainGallery.style.display = `none`;
    mainMoreInfo.style.display = `none`;

    navOverview.classList.remove(`header-nav-selected`);
    navServices.classList.remove(`header-nav-selected`);
    navContact.classList.add(`header-nav-selected`);
    navGallery.classList.remove(`header-nav-selected`);
    navMoreInfo.classList.remove(`header-nav-selected`);
  });

  navGallery.addEventListener("click", (event) => {
    event.preventDefault();
    mainOverview.style.display = `none`;
    mainServices.style.display = `none`;
    mainContact.style.display = `none`;
    mainGallery.style.display = `block`;
    mainMoreInfo.style.display = `none`;

    navOverview.classList.remove(`header-nav-selected`);
    navServices.classList.remove(`header-nav-selected`);
    navContact.classList.remove(`header-nav-selected`);
    navGallery.classList.add(`header-nav-selected`);
    navMoreInfo.classList.remove(`header-nav-selected`);
  });

  navMoreInfo.addEventListener("click", (event) => {
    event.preventDefault();
    mainOverview.style.display = `none`;
    mainServices.style.display = `none`;
    mainContact.style.display = `none`;
    mainGallery.style.display = `none`;
    mainMoreInfo.style.display = `block`;

    navOverview.classList.remove(`header-nav-selected`);
    navServices.classList.remove(`header-nav-selected`);
    navContact.classList.remove(`header-nav-selected`);
    navGallery.classList.remove(`header-nav-selected`);
    navMoreInfo.classList.add(`header-nav-selected`);
  });
}

// read  business explorer info from API
async function fetchBusinessExplorer() {
  let data;
  try {
    const response = await fetch(
      `resources/businesses/general/businessesList.json`
    );
    if (response) {
      data = await response.json();
    } else {
      console.log("we have error");
    }
    businessesList = data;
    explorerPageMaker();
    // return data;
  } catch (error) {
    // You can handle errors or return a default value here if needed
    return error;
  }
}

// explorer page maker function
function explorerPageMaker() {
  app.innerHTML = `
    <!-- main -->
    <main class="explorer-main-business" id="main-business">
      <div class="explorer-title-heading">
        <h2>Business Explorer</h2>
        <div class="explorer-search-field">
        <div class="explorer-filter">
          <div class="filter-country box-shadow filter-card">
            <div  class="filter-selector">
            <span data-type="country">All Countries</span>
            <i class="fa fa-angle-down"></i>
            </div>
            <div class="dropdown-content box-shadow"></div>
          </div>
          <div class="filter-city box-shadow filter-card">
            <div  class="filter-selector">
            <span data-type="city">All Cities</span>
            <i class="fa fa-angle-down"></i>
            </div>
            <div class="dropdown-content box-shadow"></div>

          </div>
          <div class="filter-category box-shadow filter-card">
            <div class="filter-selector">
            <span data-type="category">All Categories</span>
            <i class="fa fa-angle-down"></i>
            </div>
            <div class="dropdown-content box-shadow"> </div>
          </div>
        </div>
        
        <input class="search-box box-shadow" type="text" placeholder="Search..." />
      </div>
      </div>
      <div class="business-lists">
      </div>
    </main>`;

  const businessListItems = document.querySelector(`.business-lists`);
  const searchExplorer = document.querySelector(`.explorer-search-field input`);
  const countriesDropDown = document.querySelector(
    `.filter-country  .dropdown-content `
  );
  const citiesDropDown = document.querySelector(
    `.filter-city .dropdown-content `
  );
  const categoryDropDown = document.querySelector(
    `.filter-category .dropdown-content `
  );

  const searchBox = document.querySelector(`.search-box`);
  searchBox.value = searchFilter;

  const filterCardsToggeler = document.querySelectorAll(".filter-card .filter-selector ");
  // add businesses to explorer page
  Object.keys(businessesList).forEach((key) => {
    businessListItems.innerHTML += `
    <div class="explorer-business-card box-shadow" data-name="${businessesList[key].name}" data-country="${businessesList[key].country}" data-city="${businessesList[key].city}" data-categories="${businessesList[key].categories}" data-username="${businessesList[key].userName}">
      <div class="explorer-card-container">
        <div class="explorer-profile">
          <div class="explorer-logo">
            <img
              src="${businessesList[key].logo}"
              alt="${businessesList[key].name} logo"
            />
          </div>
          <div class="explorer-title">
            <h3>${businessesList[key].name} </h3>
            <h4>${businessesList[key].title}</h4>
          </div>
        </div>
        <p>${businessesList[key].metaDescription}
        </p>
        <div class="explorer-country">${businessesList[key].country} | ${businessesList[key].city}</div>
      </div>
      <div class="explorer-button">
        <button>Explore More</button>
      </div>
    </div>
    `;
  });

  allBusinessesCard = document.querySelectorAll(`.explorer-business-card`);

  searchExplorer.addEventListener("keyup", (e) => {
    // const searchText = e.target.value.trim().toLowerCase();
    searchFilter = e.target.value.trim().toLowerCase();
    filterUpdater(defaultBusinessCards, defaultCheckBox, searchFilter);
  });
  filterUpdater(allBusinessesCard, defaultCheckBox, searchFilter.trim().toLowerCase());


  // add event click for explore more
  allBusinessesCard.forEach(element => {
    element.querySelector(`.explorer-button`).addEventListener('click', function (e) {
      console.log(e)
      history.pushState(null, null, `/${element.dataset.username}`);
      renderPage(`/${element.dataset.username}`);
    });
  })

  // function filter drop down maker

  // set categories
  async function fetchCategories() {
    let data;
    try {
      const response = await fetch(
        `resources/businesses/general/categories.json`
      );
      if (response) {
        data = await response.json();
      } else {
        console.log("we have error");
      }
      categoriesDrobDownVar = data;
      // console.log(countryDrobDown.categories[0].title)

      categoriesDrobDownVar.categories.forEach((element) => {
        // console.log(element.title)
        categoryDropDown.innerHTML += `
        <label>
        <span> ${element.title}</span>
        <input type="checkbox" value="${element.slug}" data-type="category">
        </label>`;
      });

      // return data;
    } catch (error) {
      // You can handle errors or return a default value here if needed
      return error;
    }
  }
  fetchCategories();

  // set country and cities
  async function fetchCountriesAndCities() {
    let data;
    try {
      const response = await fetch(
        `resources/businesses/general/locations.json`
      );
      if (response) {
        data = await response.json();
      } else {
        console.log("we have error");
      }
      locationsDrobDownVar = data;
      locationsDrobDownVar.countries.forEach((element) => {
        countriesDropDown.innerHTML += `
          <label>
            <span > ${element.title}</span>
            <input type="checkbox" value="${element.slug}" data-type="country">
          </label>`;

        element.subcategories.forEach((elem) => {
          citiesDropDown.innerHTML += `
          <label>
            <span > ${elem.title}</span>
            <input type="checkbox" value="${elem.slug}" data-type="city">
          </label>  `;

        });
      });

      // return data;
    } catch (error) {
      // You can handle errors or return a default value here if needed
      return error;
    }


    // // Filter checkbox - dropdown filter - checkbox event in dropdown list  
    const businessCards = document.querySelectorAll('.explorer-business-card');
    const filterCheckBox = document.querySelectorAll(`.dropdown-content label input`);
    const filterTitleName = document.querySelectorAll(`.filter-selector > span`)
    defaultBusinessCards = businessCards;
    filterCheckBox.forEach(element => {
      // console.log(element.getAttribute('value'));
      element.addEventListener('click', function (e) {
        e.stopPropagation();
        defaultCheckBox = e.target;
        filterUpdater(defaultBusinessCards, defaultCheckBox, searchFilter);
        filterTitleUpdater(filterCheckBox, filterTitleName);
        filterDropdownCityUpdater();
      })
    })
  }
  fetchCountriesAndCities();



  // filter drop down list toggler //////////////////////////////////////////////////////////
  filterCardsToggeler.forEach((elem) => {
    elem.addEventListener("click", function (e) {
      e.stopPropagation();
      const dropdownContent = e.target.closest(".filter-card").querySelector(".dropdown-content");
      const angleIcon = e.target.querySelector(".fa");

      if (dropdownContent.style.display === "flex") {
        closeDropdown(dropdownContent, angleIcon);
      } else {
        closeAllDropdownsExcept(dropdownContent);
        openDropdown(dropdownContent, angleIcon);
      }
    });
  });

  // Function to close dropdown
  function closeDropdown(dropdownContent, angleIcon) {
    dropdownContent.style.display = "none";
    if (angleIcon) {
      angleIcon.classList.add(`fa-angle-down`);
      angleIcon.classList.remove(`fa-angle-up`);
    }
  }
  // Function to open dropdown
  function openDropdown(dropdownContent, angleIcon) {
    dropdownContent.style.display = "flex";
    if (angleIcon) {
      angleIcon.classList.add(`fa-angle-up`);
      angleIcon.classList.remove(`fa-angle-down`);
    }
  }
  // Function to close all dropdowns except the provided one
  function closeAllDropdownsExcept(excludeDropdown) {
    const allDropdowns = document.querySelectorAll(".dropdown-content");
    const allAngleIcons = document.querySelectorAll(".filter-card .fa");

    allDropdowns.forEach((dropdown) => {
      if (dropdown !== excludeDropdown) {
        closeDropdown(dropdown);
      }
    });

    allAngleIcons.forEach((icon) => icon.classList.add("fa-angle-down"));
    allAngleIcons.forEach((icon) => icon.classList.remove("fa-angle-up"));
  }

  // Event listener for clicks outside of filter cards
  document.addEventListener("click", function (event) {
    const isClickInsideFilterCard = event.target.closest(".filter-card");
    if (!isClickInsideFilterCard) {
      closeAllDropdownsExcept(null);
    }
  });
}


// function homepage Maker
function homePage() {
  app.innerHTML = `
 <main class="home-main-business" id="main-business">
      <div class="home-logo">
        <img
          src="resources/images/omanvista-logo.svg"
          alt="Oman Vista logo"
        />
      </div>
      <div class="home-search">
        <form action="#" class="home-form-explore">
          <i class="fa fa-search"></i>
          <input type="search" placeholder="Type here..." />
          <button>Explore</button>
        </form>
      </div>
            <h1 class="home-slogan">Where connection Happen</h1>

    </main>`;


  const homeFormSubmit = document.querySelector(`.home-form-explore`);
  const homeExploreButton = document.querySelector(`.home-search button`);
  const searchFieldHome = document.querySelector(`.home-form-explore input`)

  homeExploreButton.addEventListener('click', function (e) {
    e.preventDefault();
    searchFilter = searchFieldHome.value;
    history.pushState(null, null, `/businesses-explorer`);
    renderPage(`/businesses-explorer`);
  })

  homeFormSubmit.addEventListener('submit', function (e) {
    e.preventDefault();
    searchFilter = searchFieldHome.value.trim().toLowerCase();

    console.log(searchFieldHome.value);
    console.log(searchFilter);
    history.pushState(null, null, `/businesses-explorer`);
    renderPage(`/businesses-explorer`);
  })
  searchFieldHome.focus();


}




//business username validity checker
async function businessUsernamesChecker(urlName) {
  let data;
  let isValid;
  try {
    const response = await fetch(
      `resources/businesses/general/businessUsernames.json`
    );
    if (response) {
      data = await response.json();
      username = urlName.split(`/`)[1];
      isValid = data.usernames.includes(username);
      if (isValid) {
        fetchBusinessInformation();
      } else {
        app.innerHTML = "<h5>Page Not Found   |   Error 404   |   Code-012</h5>";
        console.log("code for 404 is here");
      }
    } else {
      console.log("We have error");
    }
  } catch (error) {
    // You can handle errors or return a default value here if needed
    return error;
  }
}




// function filter updater
function filterUpdater(defaultBusinessCards, defaultCheckBox, searchInput) {
  // console.log(businessCards)
  let businessCards = defaultBusinessCards;
  let checkBox = defaultCheckBox;
  let searchField = searchInput;

  if (checkBox) {
    if (checkBox.checked) {
      if (checkBox.dataset.type === "country") {
        countries.push(checkBox.value);
      }

      if (checkBox.dataset.type === "city") {
        cities.push(checkBox.value);


      }

      if (checkBox.dataset.type === "category") {
        categories.push(checkBox.value);

      }

    }
    else if (!checkBox.checked) {

      if (checkBox.dataset.type === "country") {
        countries = countries.filter(element => element !== checkBox.value);
      }

      if (checkBox.dataset.type === "city") {
        cities = cities.filter(element => element !== checkBox.value);


      }

      if (checkBox.dataset.type === "category") {
        categories = categories.filter(element => element !== checkBox.value);

      }

    }

  }
  businessCards.forEach(elem => {
    elem.style.display = 'flex';
  })

  if (countries.length > 0 || cities.length > 0 || categories.length > 0) {
    businessCards.forEach(elem => {
      elem.style.display = 'none';
    })
    businessCards.forEach(elem => {
      if (countries.length > 0) {
        countries.forEach(country => {
          if (elem.dataset.country.toLowerCase().trim() === country.toLowerCase().trim()) {
            elem.style.display = 'flex';
          }
        })
      }

      if (cities.length > 0) {
        cities.forEach(city => {
          if (elem.dataset.city.toLowerCase().trim() === city.toLowerCase().trim()) {
            elem.style.display = 'flex';
          }
        })
      }

      if (categories.length > 0) {
        categories.forEach(category => {
          if (elem.dataset.category === category) {
            elem.style.display = 'flex';
          }
        })
      }
    })
  }


  businessCards.forEach(element => {
    if (getComputedStyle(element).display !== 'none') {
      const name = element.dataset.name.toLowerCase();
      const matchName = name.includes(searchField);
      if (matchName) {
        element.style.display = "flex"; // Show the card if the name starts with the search text
      } else {
        element.style.display = "none"; // Hide the card if no match is found
      }
    }
  });
}

// filter title Updater
function filterTitleUpdater(checkboxes, filterTitle) {
  let country = false;
  let city = false;
  let category = false;

  checkboxes.forEach(elem => {
    if (elem.dataset.type === "country") {
      if (elem.checked) {
        country = true;
      }
    }

    if (elem.dataset.type === "city") {
      if (elem.checked) {
        city = true;
      }
    }

    if (elem.dataset.type === "category") {
      if (elem.checked) {
        category = true;
      }
    }

  })

  filterTitle.forEach(elem => {

    if (elem.dataset.type.toLowerCase().trim() === 'country' && country) {
      elem.innerHTML = 'Selected';
    } else {
      if (elem.dataset.type.toLowerCase().trim() === 'country') {
        elem.innerHTML = 'All Countries';
      }
    }

    if (elem.dataset.type.toLowerCase().trim() === 'city' && city) {
      elem.innerHTML = 'Selected';
    } else {
      if (elem.dataset.type.toLowerCase().trim() === 'city') {
        elem.innerHTML = 'All Cities';
      }
    }

    if (elem.dataset.type.toLowerCase().trim() === 'category' && category) {
      elem.innerHTML = 'Selected';
    } else {
      if (elem.dataset.type.toLowerCase().trim() === 'category') {
        elem.innerHTML = 'All Categories';
      }
    }

  })

}



// City filter dropdown updater 
function filterDropdownCityUpdater() {
  const filterCity = document.querySelector(`.filter-city .dropdown-content`)
  // console.log(countries);
  // console.log(locationsDrobDownVar.countries[0].slug);
  // console.log(locationsDrobDownVar);
  filterCity.innerHTML = ``;
  locationsDrobDownVar.countries.forEach((key, index) => {
    countries.forEach(element => {
      if (element === locationsDrobDownVar.countries[index].slug) {
        locationsDrobDownVar.countries[index].subcategories.forEach((elem, ind) => {
          filterCity.innerHTML += `
              <label>
                <span > ${locationsDrobDownVar.countries[index].subcategories[ind].title}</span>
                <input type="checkbox" value="${locationsDrobDownVar.countries[index].subcategories[ind].slug}" data-type="city">
              </label>  `;
        })
      }
    })
  })

  if (countries.length === 0) {
    locationsDrobDownVar.countries.forEach((key, index) => {
      locationsDrobDownVar.countries[index].subcategories.forEach((elem, ind) => {
        filterCity.innerHTML += `
              <label>
                <span > ${locationsDrobDownVar.countries[index].subcategories[ind].title}</span>
                <input type="checkbox" value="${locationsDrobDownVar.countries[index].subcategories[ind].slug}" data-type="city">
              </label>  `;
      })
    })
  }

}


// add to contact vCard function - vCard Maker
function addToContactFunc(addToContact, vName, vEmail, vWebsite, vPhone) {
  addToContact.addEventListener('click', () => {

    const sanitizedName = vName.replace(/[<>:"/\\|?*]/g, '');
    const filename = sanitizedName.substring(0, 255);

    const contact = {
      name: filename,
      email: vEmail,
      phoneNumber: vPhone,
      website: vWebsite
    };

    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
EMAIL:${contact.email}
TEL:${contact.phoneNumber}
URL:${contact.website}
END:VCARD`;


    const blob = new Blob([vCard], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename + '.vcf';
    ;
    link.click();
  });
}


// logo event listener
const navLogoLink = document.querySelector(`.nav-logo`);
navLogoLink.addEventListener('click', function () {
  history.pushState(null, null, `/`);
  renderPage(`/`);
})


//business explorer btn event click
const headerBusinessExplorerButton = document.querySelector(`.header-business-explorer`);
headerBusinessExplorerButton.addEventListener('click', function () {
  history.pushState(null, null, `/businesses-explorer`);
  renderPage(`/businesses-explorer`);
})



// modal share info function ////////////////////////////////////
// Get the modal and the buttons
function modalShareInfoHandler(link) {

  const modal = document.getElementById('myModal');
  const modalContent = document.querySelector('.modal-content input');
  const closeBtn = document.getElementsByClassName('close')[0];
  const copyBtn = document.getElementById('copyBtn');
  const copyLinkInput = document.getElementById('copyLinkInput');


  modal.style.display = 'flex';
  modalContent.value = link;

  // Close the modal when the '×' button is clicked
  closeBtn.onclick = function () {
    modal.style.display = 'none';
  };

  // Close the modal if clicked outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };


  // Copy link to clipboard when the 'Copy Link' button is clicked
  copyBtn.onclick = function () {
    copyLinkInput.select();
    document.execCommand('copy');
    modal.style.display = 'none';
    notification("Link copied!");
  };


}

// notification function
const notif = document.querySelector('.notifications')
function notification(message) {
  notif.innerHTML = message;
  notif.style.display = 'flex';
  setInterval(() => {
    notif.style.display = 'none'
  }, 2000);
}


// live-server --entry-file=index.html

