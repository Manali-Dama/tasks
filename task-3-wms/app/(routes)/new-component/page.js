import React from 'react'
import NewComponent from '@/app/components/NewComponent';

const page = () => {
    const Data = {
        data: [
          { field_key: "key1", value: "value1" },
          { field_key: "key2", value: "value2" },
          { field_key: "key3", value: "value3" },
          { field_key: "key4", value: "value4" },
          { field_key: "key5", value: "value5" },
        ]
      };
    return (
      <div>
       <NewComponent Data={Data} />
       </div>
    )
}

export default page

