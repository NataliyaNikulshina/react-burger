export const getDate = (date) => {
    let day;
    const orderDate = new Date(Date.parse(date))
    const timeZone = -orderDate.getTimezoneOffset() / 60
    const currentDay = new Date().getDate()
   
    switch (orderDate.getDate()){
        case currentDay:
            day = "Сегодня"
            break
  
        case currentDay -1:
            day = "Вчера"
            break
  
        case currentDay -2:
            day = "Позавчера"
            break
  
        default:
            day = orderDate.toLocaleDateString("ru-RU",{weekday: "long",day: "numeric"}).toString()
            break
    }
  
    return `${day}, ${orderDate.toLocaleTimeString("ru-RU",{hour:"numeric",minute:"numeric"})} i-GMT${timeZone > 0 && "+"}${timeZone}`
  }