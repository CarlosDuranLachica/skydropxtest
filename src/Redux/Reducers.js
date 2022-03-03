// Constantes
const dataInicial = {
  array: [],
  error: false,
  rateSelected: [],
};
const POST_SKYDROPX = "POST_SKYDROPX";
const SET_RATES = "SET_RATES";

// Reducer
export default function Reducer(state = dataInicial, action) {
  switch (action.type) {
    case POST_SKYDROPX:
      return {
        ...state,
        array: action.payload.array,
        error: action.payload.error,
      };

    case SET_RATES:
      return {
        ...state,
        array: action.payload.array,
        rateSelected: action.payload.rateSelected,
      };
    default:
      return state;
  }
}

// Acciones
export const selectRatesAction = (rate_id) => async (dispatch, getState) => {
  const { array } = getState().DataSkydropx;
  const { included } = array;
  let rateSelected = [...included].filter((item) => item.id === rate_id);

  dispatch({
    type: SET_RATES,
    payload: {
      array: array,
      rateSelected: rateSelected[0],
    },
  });
};

export const shipmentsAction = (ShippingInfo) => async (dispatch) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token token=Fk09kz3ivwbM4sImxQbgd8AGekxAncWWghk4Otv2fiYt"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      address_from: {
        province: "Ciudad de México",
        city: "Azcapotzalco",
        name: "Jose Fernando",
        zip: ShippingInfo.zip_from,
        country: "MX",
        address1: "Av. Principal #234",
        company: "skydropx",
        address2: "Centro",
        phone: "5555555555",
        email: "skydropx@email.com",
      },
      parcels: [
        {
          weight: ShippingInfo.parcel.weight,
          distance_unit: "CM",
          mass_unit: "KG",
          height: ShippingInfo.parcel.height,
          width: ShippingInfo.parcel.width,
          length: ShippingInfo.parcel.length,
        },
      ],
      address_to: {
        province: "Jalisco",
        city: "Guadalajara",
        name: "Jorge Fernández",
        zip: ShippingInfo.zip_to,
        country: "MX",
        address1: " Av. Lázaro Cárdenas #234",
        company: "-",
        address2: "Americana",
        phone: "5555555555",
        email: "ejemplo@skydropx.com",
        reference: "Frente a tienda de abarro",
        contents: "Descripcion del contenido del paquete",
      },
      consignment_note_class_code: "53131600",
      consignment_note_packaging_code: "1H1",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api-demo.skydropx.com/v1/shipments", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message, code } = result;
        dispatch({
          type: POST_SKYDROPX,
          payload: {
            array: result,
            error: message ? { message: message, code: code } : false,
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  } catch (error) {
    console.log(error);
  }
};
