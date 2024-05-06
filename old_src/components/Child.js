import React, { memo } from 'react';

const Child = memo(function() {
  console.log("Child 렌더링");
  return (
    <div>
      <h4>자식임</h4>
    </div>
  );
});

export default Child;