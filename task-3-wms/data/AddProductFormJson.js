// export const ProductDropdowns = {
//     product_type: [],
//     dosage_form: [],
//     package_type: [],
//     uom: [],
//     schedule_type_code: [],
//     gst_type: [],
//     b2b_category: [],
//     sales_trend_category: [],
//     product_return_type: [],
//     mis_reporting_category: [],
//     mis_warehouse_category: []
// };

export const form_fields = {
    sections: [
        {
          title: "Header",
          fields: [
            {
              type: "title",
              label: "Add Product",
            },
            {
              type: "button",
              label: "Close",
            },
          ],
        },
        {
            title: "fixed",
            fields: [
                {
                    type: "input",
                    label: "Product Name",
                    field_key: "product_name",
                    required: true
                },
                {
                    type: "dropdown",
                    label: "Product Type",
                    field_key: "product_type",
                    required: true
                },
                {
                    type: "input",
                    label: "Wondersoft Code",
                    field_key: "ws_code",
                    required: true
                },
                {
                    type: "input",    
                    label: "Product Code",
                    field_key: "product_code",
                    required: true
                },
                {
                    type: "search-dropdown",
                    label: "Manufacturer",
                    field_key:"manufacturers",
                    options: "manufacturers",
                    required: true
                },
                
                {
                    type: "input",
                    label: "MRP",
                    field_key: "mrp", 
                    required: true
                },
            ]
        },
        {
            title: "variable",
            fields: [
                {
                    type: "section",
                    title: "Packaging and Units",
                    fields: [
                        {
                            type: "dropdown",
                            label: "Dosage Form",
                            field_key: "dosage_form",
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Package type",
                            field_key: "package_type",
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Unit of Measurement",
                            field_key: "uom",
                            required: true
                        },
                        {
                            type: "input",
                            label: "Package Size",
                            field_key: "package_size",
                            required: true
                        }
                    ]
                },
                {
                    type: "section",
                    title: "Molecule Composition",
                    fields: [
                        {
                            type: "dropdown",
                            label: "Molecules",
                            options: "molecules",
                            required: false
                        }
                    ]
                },
                {
                    type: "section",
                    title: "Classification",
                    fields: [
                        {
                            type: "dropdown",
                            label: "Is Assured",
                            field_key: "is_assured",
                            options: ['yes','no'],
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Discontinued",
                            field_key: "is_discontinued",
                            options: ['yes','no'],
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Banned",
                            field_key: "banned",
                            options: ['yes','no'],
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Is Active",
                            field_key: "is_active",
                            options: ['yes','no'],
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Is Hidden Fron Alternate",
                            field_key: "is_hidden_from_alternate_products",
                            options: ['yes','no'],
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Rx Required",
                            field_key: "is_rx_required",
                            options: ['yes','no'],
                            required: false
                        },
                        {
                            type: "dropdown",
                            label: "Can Sell Online",
                            field_key: "can_sell_online",
                            options: ['yes','no'],
                            required: false
                        },
                        {
                            type: "dropdown",
                            label: "Chronic",
                            field_key: "is_chronic",
                            options: ['yes','no'],
                            required: false
                        },
                        {
                            type: "dropdown",
                            label: "Refrigerated",
                            field_key: "is_refrigerated",
                            options: ['yes','no'],
                            required: false
                        },
                        {
                            type: "input",
                            label: "Sheduled Type code",
                            field_key: "scheduled_type_code",
                            required: false
                        }
                    ]
                },
                {
                    type: "section",
                    "title": "Transaction Units",
                    "fields": [
                        {
                            type: "input",
                            label: "Purchase Unit",
                            field_key: "purchase_unit",
                            required: true
                        },
                        {
                            type: "input",
                            label: "Transfer Unit",
                            field_key: "transfer_unit",
                            required: true
                        },
                        {
                            type: "input",
                            label: "Sales Unit",
                            field_key: "sales_unit",
                            required: true
                        }
                    ]
                },
                {
                    type: "section",
                    "title": "GST Info",
                    "fields": [
                        {
                            type: "dropdown",
                            label: "GST Type",
                            field_key: "gst_type",
                            required: true
                        },
                        {
                            type: "input",
                            label: "HSN Code",
                            field_key: "hsn_code",
                            required: true
                        },
                    ]
                },
                {
                    type: "section",
                    "title": "Sales Category",
                    "fields": [
                        {
                            type: "dropdown",
                            label: "B2B Product type",
                            field_key: "b2b_category",
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "B2C Product type",
                            field_key: "b2c_category",
                            required: false
                        },
                        {
                            type: "dropdown",
                            label: "Sales Trend Category",
                            field_key: "sales_trend_category",
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Return Type",
                            field_key: "product_return_type",
                            required: true
                        }
                    ]
                },
                {
                    type: "section",
                    "title": "MIS Category",
                    "fields": [
                        {
                            type: "dropdown",
                            label: "Reporting Category",
                            field_key: "mis_reporting_category",
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "WH Category",
                            field_key: "mis_warehouse_category",
                            required: true
                        }
                    ]
                }
            
            ]
        },
        {
            title: "submit",
            fields: [
                {
                    type: "button",
                    label: "save"
                }
            ]
        }
    ]
};