import React, { useState, useEffect } from 'react';

import * as utils from '../data/services/lms/utils';
import { getCourseList } from '../data/services/lms/api';
import StudentList from './StudentList';

const CoursesList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [selectedIdOption, setSelectedIdOption] = useState('');
    
    const { get, post, stringifyUrl } = utils;

    const handleSelectIdChange = (event) => {
        setSelectedIdOption(event.target.value);
    };
  
    useEffect(() => {
      // Define the async function
        const fetchData = async () => {
          try {
            const response = await get(getCourseList());
            setList(response.data);
            setLoading(false)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
  
      // Call the async function
       fetchData();
    }, []); // The empty dependency array means this effect runs once when the component mounts
  
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <select id="selectOption" value={selectedIdOption} onChange={handleSelectIdChange}>
            <option key="" value="---">---</option>
            {list.results.map(item => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
          </select>
        )}
        <StudentList course_id={selectedIdOption}/>
      </div>
    );
  };
  
  export default CoursesList;