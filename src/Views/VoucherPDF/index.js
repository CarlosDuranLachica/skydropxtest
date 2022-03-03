// dependencias
import { Fragment } from "react";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// hooks react redux
import { useSelector } from "react-redux";

// icons
import { arrayLogos } from "../../Icons/arrayIcons";
import skydropx_logo from "../../Icons/skydropx_logo.png";

// styles
import { Row, Button, Spin } from "antd";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    padding: "16px",
  },
  logo: {
    width: "30%",
    margin: "16px",
    marginRight: "auto",
  },
  section: {
    margin: 10,
    padding: 5,
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  titles: {
    width: "100%",
    fontSize: 15,
    borderBottom: 1,
  },
  boxConteniner: {
    width: "30%",
    margin: "8px",
  },
  labels: {
    fontSize: 12,
    fontWeight: "bold",
  },
  labelsInfo: {
    fontSize: 12,
    marginLeft: 10,
  },
  logoRates: {
    width: "90%",
    margin: "16px",
    marginRight: "auto",
  },
  boxRates: {
    width: "90%",
    margin: "8px",
  },
});

// Create Document Component
const MyDocument = ({ shipments, rateSelected }) => {
  console.log(rateSelected);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={skydropx_logo}></Image>
        {shipments && shipments.included ? (
          <View>
            {shipments.included.map((item) => (
              <View key={item.id}>
                {item.type === "parcels" ? (
                  <View style={styles.section}>
                    <Text style={styles.titles}>Datos del paquete</Text>

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Peso: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.weight +
                          " " +
                          item.attributes.mass_unit}
                      </Text>
                    </View>

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Alto: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.height +
                          " " +
                          item.attributes.distance_unit}
                      </Text>
                    </View>

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Ancho: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.width +
                          " " +
                          item.attributes.distance_unit}
                      </Text>
                    </View>

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Largo: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.length +
                          " " +
                          item.attributes.distance_unit}
                      </Text>
                    </View>
                  </View>
                ) : item.type === "addresses" ? (
                  <View style={styles.section}>
                    <Text style={styles.titles}>
                      {item.attributes.contents && item.attributes.reference
                        ? "Enviado desde"
                        : "Enviado a"}
                      :
                    </Text>

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Nombre: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.name}
                      </Text>
                    </View>

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Dirección: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.address1 +
                          ", " +
                          item.attributes.address2}
                      </Text>
                    </View>

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Ciudad: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.city}
                      </Text>
                    </View>

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Provincia: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.province}
                      </Text>
                    </View>

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Codigo Postal: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.zip}
                      </Text>
                    </View>

                    {item.attributes.reference ? (
                      <View style={styles.boxConteniner}>
                        <Text style={styles.labels}>Referencia: </Text>
                        <Text style={styles.labelsInfo}>
                          {item.attributes.reference}
                        </Text>
                      </View>
                    ) : null}

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Telefono: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.phone}
                      </Text>
                    </View>

                    <View style={styles.boxConteniner}>
                      <Text style={styles.labels}>Email: </Text>
                      <Text style={styles.labelsInfo}>
                        {item.attributes.email}
                      </Text>
                    </View>

                    {item.attributes.contents ? (
                      <View style={styles.boxConteniner}>
                        <Text style={styles.labels}>
                          Descripción del paquete:{" "}
                        </Text>
                        <Text style={styles.labelsInfo}>
                          {item.attributes.contents}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ) : null}
              </View>
            ))}
            <View style={styles.section}>
              <Text style={styles.titles}>Servicio de paquetería:</Text>
              <View style={styles.boxConteniner}>
                {arrayLogos[rateSelected.attributes.provider] ? (
                  <Image
                    style={styles.logoRates}
                    src={arrayLogos[rateSelected.attributes.provider]}
                  ></Image>
                ) : (
                  <View style={{ marginTop: "16px" }}>
                    <Text style={styles.labels}>Nombre: </Text>
                    <Text style={{ fontSize: 20 }}>
                      {rateSelected.attributes.provider}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.boxConteniner}>
                <View style={styles.boxRates}>
                  <Text style={styles.labels}>Tipo de envio: </Text>
                  <Text style={styles.labelsInfo}>
                    {rateSelected.attributes.service_level_name}
                  </Text>
                </View>

                <View style={styles.boxRates}>
                  <Text style={styles.labels}>Tiempo estimado: </Text>
                  <Text style={styles.labelsInfo}>
                    {rateSelected.attributes.days + " días"}
                  </Text>
                </View>

                <View style={styles.boxRates}>
                  <Text style={styles.labels}>Precio: </Text>
                  <Text style={styles.labelsInfo}>
                    {rateSelected.attributes.total_pricing +
                      " " +
                      rateSelected.attributes.currency_local}
                  </Text>
                </View>
              </View>

              <View style={styles.boxConteniner}>
                <Image
                  style={{ margin: "8px 0 0 auto", width: "60%" }}
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${"https://www.skydropx.com/"}`}
                ></Image>
              </View>
            </View>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

const Index = () => {
  const shipments = useSelector((store) => store.DataSkydropx.array);
  const rateSelected = useSelector((store) => store.DataSkydropx.rateSelected);

  return (
    <>
      <Row justify="center" style={{ margin: "20px 0", position: "relative" }}>
        <PDFDownloadLink
          style={{
            position: "absolute",
            zIndex: "1",
            width: "80%",
            maxWidth: "800px",
          }}
          document={
            <MyDocument shipments={shipments} rateSelected={rateSelected} />
          }
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) => (
            <Button
              onClick={() => console.log("Click")}
              type="primary"
              className="success"
              style={{ width: "100%" }}
            >
              {loading ? "Cargando documento..." : "Descargar PDF!"}
            </Button>
          )}
        </PDFDownloadLink>
      </Row>
      {shipments && rateSelected ? (
        <PDFViewer
          style={{ width: "100%", height: "100vh", marginTop: "35px" }}
        >
          <MyDocument shipments={shipments} rateSelected={rateSelected} />
        </PDFViewer>
      ) : (
        <Spin size="large" />
      )}
    </>
  );
};

export default Index;
