import biedronka from '../assets/images/biedronka.jpg'
import lidl from '../assets/images/lidl.jpg'
import kaufland from '../assets/images/kaufland.jpg'

const API_URL = 'http://localhost:3001';

const shops = [
    {name: 'Biedronka', image_url: biedronka},
    {name: 'Lidl', image_url: lidl},
    {name: 'Kaufland', image_url: kaufland},
]

const categories = [
    {name: 'Mięso', icon: '#', routeLink: '/categories/meat'},
    {name: 'Napoje', icon: '#', routeLink: '/categories/drinks'},
    {name: 'Słodycze', icon: '#', routeLink: '/categories/sweets'},
    {name: 'Owoce', icon: '#', routeLink: '/categories/fruits'},
    {name: 'Pieczywo', icon: '#', routeLink: '/categories/bread'},
    {name: 'Warzywa', icon: '#', routeLink: '/categories/vegetables'},
    {name: 'Mrożone', icon: '#', routeLink: '/categories/frozen'},
]

const footerData = [
    {
        title: "Sklep", 
        links: [
            {name: "Karty podarunkowe", routeLink: "/"},
            {name: "Mapa", routeLink: "/"},
            {name: "Blog", routeLink: "/"},
            {name: "Logowanie", routeLink: "/login"},
            {name: "Rejestracja", routeLink: "/register"},
        ]
    },
    {
        title: "Sprzedaż", 
        links: [
            {name: "Zespoły", routeLink: "/"},
            {name: "Forum", routeLink: "/"},
            {name: "Partnerzy", routeLink: "/"},
        ]
    },
    {
        title: "O nas", 
        links: [
            {name: "Foodie, Inc.", routeLink: "/"},
            {name: "Zasady", routeLink: "/"},
            {name: "Inwestorzy", routeLink: "/"},
            {name: "Kariera", routeLink: "/"},
            {name: "Prasa", routeLink: "/"},
        ]
    },
    {
        title: "Pomoc", 
        links: [
            {name: "Centrum pomocy", routeLink: "/"},
            {name: "Bezpieczeństwo", routeLink: "/"},
            {name: "Ustawienia prywatności", routeLink: "/"},
        ]
    },
]

export { shops, categories, footerData, API_URL };