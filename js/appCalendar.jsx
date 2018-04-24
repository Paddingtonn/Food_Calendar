import React from 'react';
import food from './food.js';
console.log(food);


    class Clock extends React.Component {
        state = {
            date: new Date(),
        }
        render() {
            return <div>
                <h3 style={{color: "rgba(100,344,200,0.4)", marginTop:'-20px', marginRight:'-50px'}}>{this.state.date.toLocaleDateString()}</h3><h2 style={{color: "rgba(100,344,200,0.4)", marginRight:'-50px'}}>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        }
        componentDidMount() {
            this.id = setInterval(() => {
                this.setState({
                    date: new Date(),
                })
            }, 1000)
        }
        componentWillUnmount() {
            clearInterval(this.id);
        }
    }

    class CalendarCell extends React.Component{
        state={
            display:'none',
            position:'absolute',
            select:'',
            foodArray: this.props.foods && this.props.foods[this.props.name]? this.props.foods[this.props.name]: [],
            grams: "gram",
        };
        slideUp = (e) => {
            this.setState({
                display:'block',
            })
        };
        slideDown = (e) => {
            this.setState({
                display:'none',
            })
        };
        handleChange = (e) => {
            this.setState({
                select: e.target.value,
            })
        };
        buttonClick=(e)=>{
            // const newFoodArray = this.state.foodArray.slice();
            // newFoodArray.push(this.state.select);
            // this.setState({
            //     foodArray: newFoodArray,
            // })
            const food= {name: this.state.select, grams:this.state.grams};
            this.props.addFood(this.props.name, food);
        };
        handleGrams = (e) => {
            this.setState({
                grams: Number(e.target.value),
            });
            console.log('co to jest?', this.state.grams);
        };
        onFocus = () => {
            this.setState({
                grams: '',
            })
        };

        render(){
            const foodArray = this.props.foods && this.props.foods[this.props.name]? this.props.foods[this.props.name]: [];

            console.log(this.props);

            const food = this.props.item.map((i,index) => <option value={i.name} key={index}>{i.name}</option>);

            return <div style={{position:'relative', overflowY:'scroll'}} className="dynamic_div" onClick={this.slideUp} onDoubleClick={this.slideDown}><ul>{foodArray.map(el => <li>{el.name}</li>)}</ul>
                <div style={this.state}>
                    <select onChange={this.handleChange}>
                    {food}
                    </select>
                    <input style={{fontWeight:'bold'}} value={this.state.grams} onChange={this.handleGrams} type="text" onFocus={this.onFocus}/>
                    <button onClick={this.buttonClick} type="submit">EATS</button>
                </div>
            </div>
        }
    }

    class Calendar extends  React.Component{
        constructor(props) {
            super(props);
            this.state = {
                data: {},
            }
        };
        addFood = (name,food) => {
            const newData= Object.assign({}, this.state.data);
            if(!newData[name]){
                newData[name] = [];
            }
            newData[name].push(food);
            this.setState({
                data: newData,
            })
        };
        render(){
            console.log(this.state.data);
            return <table className="table">
                <tr>
                    <th className="animImage" rowSpan="2"><img id="calendar-img" src="img/Romans14-law-of-clean-and-unclean-meats.jpg"/></th>
                    <th id="calendar-head" colSpan="5">Weekly <span>meal</span> calendar</th>
                    <th><Clock/></th>
                </tr>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
                <tr>
                    <th>breakfast</th>
                    <td><CalendarCell item={food} addFood={this.addFood} name="mon-br" foods={this.state.data}/>{this.state.item}</td>
                    <td><CalendarCell item={food}/>{this.state.item}</td>
                    <td><CalendarCell item={food}/>{this.state.item}</td>
                    <td><CalendarCell item={food}/>{this.state.item}</td>
                    <td><CalendarCell item={food}/>{this.state.item}</td>
                    <td><CalendarCell item={food}/>{this.state.item}</td>
                    <td><CalendarCell item={food}/>{this.state.item}</td>
                </tr>
                <tr>
                    <th>lunch</th>
                    <td><CalendarCell item={food} addFood={this.addFood} name="mon-lu" foods={this.state.data}/>{this.state.item}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>dinner</th>
                    <td><CalendarCell item={food} addFood={this.addFood} name="mon-din" foods={this.state.data}/>{this.state.item}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>snacks</th>
                    <td><CalendarCell item={food} addFood={this.addFood} name="mon-sna" foods={this.state.data}/>{this.state.item}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr><th colSpan="8"></th></tr>
                <SubTable item={food} foods={this.state.data}/>
            </table>
        }
    }
    class SubTable extends React.Component {

        render() {
            let mon_br =0;
            let mon_lu =0;
            let mon_din =0;
            let mon_sna =0;

            console.log(this.props.foods["mon-lu"], "wybrany produkt");

            if(this.props.foods["mon-br"]) {
                this.props.foods["mon-br"].forEach(el => {
                    this.props.item.forEach(i => {
                        if (el.name === i.name) {
                            mon_br += (el.grams/100) * i.kcal;
                            console.log(mon_br);
                        }if(isNaN(el.grams)){
                            mon_br = 0;
                        }
                    });
                });
            }
            if(this.props.foods["mon-lu"]) {
                this.props.foods["mon-lu"].forEach(el => {
                    this.props.item.forEach(i => {
                        if (el.name === i.name){
                            mon_lu += (el.grams/100) * i.kcal;
                            console.log(mon_lu);
                        }if(isNaN(el.grams)){
                            mon_lu = 0;
                        }
                    })
                })
            }
            if(this.props.foods["mon-din"]){
                this.props.foods["mon-din"].forEach(el => {
                    this.props.item.forEach(i => {
                        if (el.name === i.name){
                            mon_din += (el.grams/100) * i.kcal;
                        }if(isNaN(el.grams)){
                            mon_din = 0;
                        }
                    })
                })
            }
            if(this.props.foods["mon-sna"]){
                this.props.foods["mon-sna"].forEach(el => {
                    this.props.item.forEach(i => {
                        if (el.name === i.name){
                            mon_sna += (el.grams/100) * i.kcal;
                        }if(isNaN(el.grams)){
                            mon_sna = 0;
                        }
                    })
                })
            }
            let sumKcal = (Number(mon_lu) + Number(mon_br) + Number(mon_din) + Number(mon_sna)).toFixed(2);

            return <tfoot className="subTable">
                <tr>
                    <th>approx. kcal intake</th>
                    <td>{sumKcal} kcal</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        }
    }


    class AppCalendar extends React.Component{
        // state={
        //     text: '',
        // }
        // fn = (ele) =>{
        //     this.setState({
        //         text: ele,
        //     })
        // }

        render(){
            return <div className="main-table">
                <p style={{fontSize:'30px', marginTop:'-90px', marginLeft:'1000px', position:'absolute'}}>Hello {this.props.match ? this.props.match.params.user : ''} !</p>
                <Calendar/>
            </div>
        }
    }

export default AppCalendar;