import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful';
import Course from './Course';

const SPACE_ID = 'difkn9mu97gt';
const ACCESS_TOKEN = '9d9f8eccff02fe8c678b0a2c879f8e10106678494982ccf49f1abb4e9756e6fd';

const client = contentful.createClient({
  space : SPACE_ID,
  accessToken : ACCESS_TOKEN
});

class CourseList extends Component{
  state = {
    courses : [],
    searchString : ''
  }

  constructor(){
    super();
    this.getCourses();
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
  }

  getCourses(){
    client.getEntries({
      content_type : 'courses',
      query : this.state.searchString
    })
    .then((response) => {
      this.setState({
        courses : response.items
      });
    }).catch((error) =>{
      console.log('Error occured while fetching data!');
      console.log(error);
    })

  }

  onSearchInputChange(event){
    if(event.target.value){
      this.setState({
        searchString : event.target.value
      })
    }else{
      this.setState({
        searchString : ''
      })
    }
    this.getCourses();
  }

  render(){
    return(
      <div>
        {this.state.courses ? (
          <div>
            <TextField style={{padding:24}} id="searchInput" placeholder="Search for courses" margin="normal" onChange={this.onSearchInputChange}/>
            <Grid container spacing={24} style={{padding : 24}}>
              {this.state.courses.map((currentCourse) => {
                //console.log(currentCourse);
                return (
                  <Grid key={currentCourse.sys.id} item xs={12} sm={6} lg={4} xl={3} >
                    <Course course={currentCourse}/>
                  </Grid>
                  )
              })}
            </Grid>
          </div>
        ) : "No courses found"}
      </div>
    );
  }


}

export default CourseList;
