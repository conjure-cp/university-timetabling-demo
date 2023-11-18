import React, { useEffect, useState } from 'react';

const REPO_URL = 'conjure-cp/university-timetabling-demo'

const Banner = () => {
  // fetch and slice the contributors list
    const [contributors, setContributors] = useState([]);
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
      // Fetch contributors from GitHub
      fetch(`https://api.github.com/repos/${REPO_URL}/contributors`)
        .then(response => response.json())
        .then(data => {
          const filteredData = data.filter(contributor => contributor.login !== 'williamburns' && !contributor.login.endsWith('[bot]'));
          setContributors(filteredData.map(contributor => contributor.login));
        })
        .catch(error => console.error('Error:', error));

      // Fetch last updated time
      fetch(`https://api.github.com/repos/${REPO_URL}`)
      .then(response => response.json())
      .then(data => {
        const updatedDate   = new Date(data.updated_at);
        const formattedDate = `${updatedDate.getFullYear()}-${String(updatedDate.getMonth() + 1).padStart(2, '0')}-${String(updatedDate.getDate()).padStart(2, '0')}`;
        setLastUpdated(formattedDate);
      })
      .catch(error => console.error('Error:', error));
    }, []);

    const chunkSize = 3;
    const chunkedContributors = [];
  
    // Chunk the array into sizes of 3
    for (let i = 0; i < contributors.length; i += chunkSize) {
      chunkedContributors.push(contributors.slice(i, i + chunkSize));
    }

    return (
      <div class="banner">
        
        {/* 1.1 Logo Section */}
        <div class="logo-section">
          <div className="flex items-center m-1">
                  <img src="conjure-cp-logo.png" alt="conjure-cp" className="w-16 h-16 " />
                    <div className="text-xl font-semibold ml-4">
                      <a href="https://github.com/conjure-cp" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        conjure-cp
                      </a>
                    </div>
                </div>
                <div className="text-3 font-bold tracking-wide mb-4 m-1">Workload Planner</div>
              
                <div className="mb-2 m-1">This project is created as a dissertation project at the University of St Andrews for optimal workload planning.</div>
                <div className="mb-2 m-1">License: Mozilla Public License 2.0</div>
                {/* Last Updated */}
                <div className="text-sm mb-2 m-1"> Last Updated: {lastUpdated} </div>
          </div>

          {/* 1.2 Project Author */}
          <div class="project-author">
              <span className="text-lg font-semibold mb-2">Project Author</span>
              <div className="grid grid-cols-2 grid-flow-col gap-2 overflow-auto"> 
                <a href={`https://github.com/williamburns`} className="mb-1 hover:underline" >William Burns</a>
              </div>
          </div>
    
          {/* 1.3 Project Contributors */}
          <div className="project-contributors">
            <span className="text-lg font-semibold mb-2">Project Contributors</span>
            <div className="grid grid-cols-2 grid-flow-col gap-2 overflow-auto"> 
            {chunkedContributors.map((chunk, chunkIndex) => (
              <div key={`chunk-${chunkIndex}`} className="row-span-1 col-span-1 flex flex-col items-start">
                {chunk.map((contributor, index) => (
                  <a key={index} href={`https://github.com/${contributor}`} className="mb-1 hover:underline">{contributor}</a>
                ))}
              </div>
            ))}
            </div>
          </div>
          
          {/* 2.1 Additional Links*/}
           <div className="additional-links">
            <span className="text-lg font-semibold mb-2">Additional Links</span>
            <a href={`https://github.com/${REPO_URL}`} className="mb-1 hover:underline">GitHub</a>
            <a href={`https://github.com/${REPO_URL}#readme`} className="mb-1 hover:underline">Documentation</a>
            <a href={`https://github.com/${REPO_URL}#application-preview`} className="mb-1 hover:underline">Demo</a>
          </div>

            
          {/* 2.2 Source Code Info Section */}
           <div className="info-section">
              <span className="text-lg font-semibold mb-2">Demo</span>
              <a href={`https://github.com/${REPO_URL}/blob/main/screenshots/create-project.gif`} className="mb-1 hover:underline">Create new project</a>
              <a href={`https://github.com/${REPO_URL}/blob/main/screenshots/create-category.gif`} className="mb-1 hover:underline">Create new category</a>
              <a href={`https://github.com/${REPO_URL}/blob/main/screenshots/create-task.gif`} className="mb-1 hover:underline">Create new task</a>
              <a href={`https://github.com/${REPO_URL}/blob/main/screenshots/create-user.gif`} className="mb-1 hover:underline">Create new user</a>
          </div>

      </div>
    );
  }
  
  export default Banner;
  