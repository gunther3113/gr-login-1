import React, { Component } from 'react';

const List = (user) => {

    const posts = user && user.posts ? user.posts : null;  // TODO this can be more succinct

    return (
      <div className="App">
        <h1>List of Items</h1>
        {/* Check to see if any items are found*/}
        {posts.length ? (
          <div>
            {/* Render the list of items */}
            {posts.map((item) => {
              return(
                <div>
                  {item}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No Posts Found</h2>
          </div>
        )
      }
      </div>
    );
}

export default List;