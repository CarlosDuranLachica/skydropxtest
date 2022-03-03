// dependencias
import { Fragment } from "react";
import { useNavigate, Navigate } from "react-router-dom";

// hooks react redux
import { useSelector, useDispatch } from "react-redux";

// importamos la acción
import { selectRatesAction } from "../../Redux/Reducers";

// icons
import { arrayLogosSVG } from "../../Icons/arrayIcons";

// styles
import { Spin, Row, Button } from "antd";
import "./style.css";

const Index = () => {
  let navigate = useNavigate();

  // declaramos displach para llamar a la acción o acciones
  const dispatch = useDispatch();

  // crearmos el state utilizando nuestra tienda
  // store.pokemones lo sacamos de la tienda
  const shipments = useSelector((store) => store.DataSkydropx.array);
  const error = useSelector((store) => store.DataSkydropx.error);

  return error !== false ? (
    <Navigate replace to={"/ERROR"} />
  ) : (
    <div id="SelectPackageService">
      {shipments && shipments.included ? (
        shipments.included.map((item) => (
          <Fragment key={item.id}>
            {item.type === "parcels" ? (
              <div className="container shadow">
                <h1>Selecciona un servicio de paquetería</h1>

                <section className="parcel">
                  <h1>Datos del paquete</h1>
                  <Row
                    justify="space-around"
                    style={{ width: "50%", margin: "0 auto" }}
                  >
                    <div>
                      <b>Peso: </b>
                      {item.attributes.weight + " " + item.attributes.mass_unit}
                    </div>
                    <div>
                      <b>Alto: </b>
                      {item.attributes.height +
                        " " +
                        item.attributes.distance_unit}
                    </div>
                    <div>
                      <b>Ancho: </b>
                      {item.attributes.width +
                        " " +
                        item.attributes.distance_unit}
                    </div>
                    <div>
                      <b>Largo: </b>
                      {item.attributes.length +
                        " " +
                        item.attributes.distance_unit}
                    </div>
                  </Row>
                </section>
              </div>
            ) : item.type === "rates" ? (
              <section className="rate container shadow">
                {arrayLogosSVG[item.attributes.provider] ? (
                  <Row
                    className="name"
                    justify="center"
                    align="middle"
                    style={{ minHeight: "96px" }}
                  >
                    <img
                      src={arrayLogosSVG[item.attributes.provider]}
                      alt="logo"
                    />
                  </Row>
                ) : (
                  <h1 className="name">{item.attributes.provider}</h1>
                )}

                <div className="type flex wrap">
                  <b>Tipo de envio: </b>
                  <span>{item.attributes.service_level_name}</span>
                </div>

                <div className="time flex wrap">
                  <b>Tiempo estimado: </b>
                  <span>{item.attributes.days + " días"}</span>
                </div>

                <div className="price flex wrap">
                  <b>Precio: </b>
                  <span>
                    {item.attributes.total_pricing +
                      " " +
                      item.attributes.currency_local}
                  </span>
                </div>

                <Button
                  className="button"
                  type="primary"
                  onClick={() => {
                    dispatch(selectRatesAction(item.id));
                    navigate("/VoucherPDF");
                  }}
                >
                  Seleccionar
                </Button>
              </section>
            ) : item.type === "addresses" ? (
              <section className="addresses container shadow">
                <h1>
                  {item.attributes.contents && item.attributes.reference
                    ? "Enviado desde"
                    : "Enviado a"}
                  :
                </h1>

                <div className="flex wrap">
                  <b>Nombre: </b>
                  <span>{item.attributes.name}</span>
                </div>

                <div className="flex wrap">
                  <b>Dirección: </b>
                  <span>
                    {item.attributes.address1 + ", " + item.attributes.address2}
                  </span>
                </div>

                <div className="flex wrap">
                  <b>Ciudad: </b>
                  <span>{item.attributes.city}</span>
                </div>

                <div className="flex wrap">
                  <b>Provincia: </b>
                  <span>{item.attributes.province}</span>
                </div>

                <div className="flex wrap">
                  <b>Codigo Postal: </b>
                  {item.attributes.zip}
                </div>

                {item.attributes.reference ? (
                  <div className="flex wrap">
                    <b>Referencia: </b>
                    <span>{item.attributes.reference}</span>
                  </div>
                ) : null}

                <div className="flex wrap">
                  <b>Telefono: </b>
                  <span>{item.attributes.phone}</span>
                </div>

                <div className="flex wrap">
                  <b>Email: </b>
                  <span>{item.attributes.email}</span>
                </div>

                {item.attributes.contents ? (
                  <div className="flex wrap">
                    <b>Descripción del paquete: </b>
                    <span>{item.attributes.contents}</span>
                  </div>
                ) : null}
              </section>
            ) : null}
          </Fragment>
        ))
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
};

export default Index;
