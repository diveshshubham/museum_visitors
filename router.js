const { Long } = require('bson');
const unirest = require('unirest');
require("dotenv").config();
const appRouter = (app) => {


    app.get("/api/visitors", async (req, res) => {

        let ignored_museum = req.query.ignore;
        let search_date = req.query.date;
        let final_res = {};
        let link = process.env.BASE_PATH
        let incoming_data = null
        let key_array = []
        let value_array = []
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let _date = new Date(parseInt(search_date));
        let month = _date.getMonth()
        let year = _date.getFullYear()


        try {

            if (search_date) {
                _date =  year + "-" + _date.getDate() + "-" + (month + 1)
                link = link + "?month=" + _date
            }

            const req_uni = await unirest('GET', link)

            incoming_data = req_uni.raw_body
            incoming_data = JSON.parse(incoming_data)

            //making an object keys array of incoming response
            for (let value of Object.keys(incoming_data[0])) {
                key_array.push(value)
            }

             //making an object values array of incoming response
            for (let value of Object.values(incoming_data[0])) {
                value_array.push(value)
            }

            let attendance = {
                "month": months[month],
                "year": parseInt(year)
            }

            //removing month  from both arrays
            key_array.splice(0, 1);
            value_array.splice(0, 1);

            if(ignored_museum){
                //remove muesum_name  from key array
                //remove the same visitos number from value arry
                
                //get the index of ignored museum
                //get the visitors
                //then remove from both key and values array

                let index_of_ignored_museum = key_array.indexOf(ignored_museum,0)

                if(index_of_ignored_museum < 0){
                    res.status(404).send('Museum not found')
                }

                let ignored = {
                    "museum": key_array[index_of_ignored_museum],
                    "visitor": parseInt(value_array[index_of_ignored_museum])
                }

                final_res.ignored = ignored

                key_array.splice(index_of_ignored_museum, 1);
                value_array.splice(index_of_ignored_museum, 1);

            }

            //making every element an integer for performing max and min function
             value_array = value_array.map(function (x) { 
                return parseInt(x, 10); 
              });


            let highest_visitor = Math.max(...value_array);

            let index_of_highest_visitor = value_array.indexOf(highest_visitor);

            let lowest_visitor = Math.min(...value_array);

            let index_of_lowest_visitor = value_array.indexOf(lowest_visitor); 

            let highest = {
                "museum":key_array[index_of_highest_visitor],
                "visitors":value_array[index_of_highest_visitor]
            }

            let lowest = {
                "museum": key_array[index_of_lowest_visitor],
                "visitors": value_array[index_of_lowest_visitor]
            }

            let total = value_array.reduce(function(a, b) { return a + b; }, 0);

            final_res.attendance = attendance
            final_res.highest = highest
            final_res.lowest = lowest
            final_res.total = total

            if (incoming_data == null) {
                final_res = "no visitors at given date"
            }
            res.send({ message: "success", final_res })
        }

        catch (err) {
            console.log(err.message);
            res.status(400).send("oops! Bad Request");
        }

    });
}

module.exports = appRouter;