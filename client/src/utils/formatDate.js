const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const formattedDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;

    return formattedDate;
}

export default formatDate;