const populate = async (value, currency) => {
    let myStr = "";
    const url =
        "https://api.currencyapi.com/v3/latest?apikey=cur_live_1CFnG9571ygqEFjDt7xoW2cYQarG1f10KWGceBv4&currency=" +
        currency;
    
    try {
        let response = await fetch(url);
        let rJson = await response.json();
        
        for (let key of Object.keys(rJson["data"])) {
            myStr += `<tr>
                <td>${key}</td>
                <td>${rJson["data"][key]["code"]}</td>
                <td>${(rJson["data"][key]["value"] * value).toFixed(2)}</td>
            </tr>`;
        }
        
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = myStr;
        document.querySelector(".output").style.display = "block";
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
    const value = parseInt(
        document.querySelector("input[name='quantity']").value
    );
    const currency = document.querySelector("select[name='currency']").value;
    populate(value, currency);
});
