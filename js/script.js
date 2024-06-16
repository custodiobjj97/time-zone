import menuMobile from "./menuMobile.js";
import DarkMode from "./darkMode.js";
import SlideNav from "./slidenav.js";
import LinkSmooth from "./linksSmooth.js";
const menu = new menuMobile('.toggle','.list-menu');

menu.start()

const dark = new DarkMode('.input-dark','icon');

dark.start()

const slide = new SlideNav('.slide','.slide-wrapper');

slide.init()

slide.addControl('.control-custom');

const links = new LinkSmooth('.list-menu li a');

links.init()