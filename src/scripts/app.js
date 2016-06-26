import styles from './main.scss';

var app  = document.createElement('div');

app.innerHTML = '<h1 class="'+ styles.title +'">first init</h1>';
document.body.appendChild(app);
