import React from 'react'
import NewComponent from '@/app/components/NewComponent';

const page = () => {
    const Data = {
        data: [
          { field_key: 1, value: "value1" },
          { field_key: 2, value: "value2" },
          { field_key: 3, value: "value3" },
          { field_key: 4, value: "value4" },
          { field_key: 5, value: "value5" },
        ]
      };
    return (
      <div>
       <NewComponent Data={Data} />
       </div>
    )
}

export default page

