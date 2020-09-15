import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./../../styles/Verify.module.css";
import stylesCertificate from "./../../styles/Certificates.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Page, Document, pdfjs } from "react-pdf";
import { getFetch } from "../api/client";

function VerifyCertificate() {
  const [certificateInfo, setCertificateInfo] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [isError, setIsError] = useState(false);

  const path = {
    shieldLightBlue: "/images/shieldLightBlue.svg",
    padLock: "/images/padLock.svg",
    certificateImg: "/images/certificado.jpg",
    frame: "/images/frame.png",
  };
  const onDocumentLoadSuccess = (numPage) => {
    setNumPages(numPage);
  };

  const router = useRouter();

  useEffect(() => {
    const getCredential = async () => {
      const res = await getFetch(
        `/credentials/code/${router.query.idCredential}`
      );

      if (res.data.errors) setIsError(true);
      else setCertificateInfo(res.data);
    };
    if (router.query.idCredential) {
      getCredential();
    }
  }, [router]);
  console.log("certificateInfo");
  console.log(certificateInfo);
  return (
    <div className={styles.certificadoBody}>
      <Head>
        <title>Coraliapp | Verify certificate</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {certificateInfo && (
        <div className={styles.certificadoContainer}>
          <section
            className={`${stylesCertificate.section} ${styles.widtOneHundred}`}
            style={{ width: "90%" }}
          >
            <div className={stylesCertificate.uploadCertificateImg}>
              <img className={stylesCertificate.frameImg} src={path.frame} />
              {/* <img
                className={stylesCertificate.certificateImg}
                src={path.certificateImg}
              /> */}
              <Document
                className={stylesCertificate.certificateImg}
                file={certificateInfo.file}
                onLoadSuccess={onDocumentLoadSuccess}
                noData={<h4>Certificate</h4>}
              >
                <Page pageNumber={pageNumber} width={180} />
              </Document>
            </div>
          </section>
          <div className={`${styles.grayBorder} ${styles.displayFlex}`}>
            <img
              src={path.shieldLightBlue}
              alt="shield"
              className={styles.img}
            />
            <div>
              <h1 className={`${styles.certificadoTitle} ${styles.wordBold}`}>
                Credencial verificada
              </h1>
              <p className={styles.certificadoContent}>
                El certificado digital fue encontrado en la base de datos de
                Coralify con los detalles mostrados.
              </p>
            </div>
          </div>

          <div className={`${styles.padlockContainer} ${styles.displayFlex}`}>
            <img src={path.padLock} alt="padlock" className={styles.img} />
            <p className={styles.padlockContent}>
              Esta credencial se encuentra asegurada bajo un código unico N°
              {certificateInfo.code} provisto a la institución que suscribe el
              certificado
            </p>
          </div>
          <div className={styles.grayBorder}>
            <div>
              <h1 className={styles.certificadoTitle}>
                Emisor: <span className={styles.wordBold}>Codeable Perú</span>
              </h1>
            </div>
            <p className={styles.certificadoContent}>
              fecha de emisión:{" "}
              <span className={styles.wordBold}>25 de septiembre 20202</span>
            </p>
            <p className={styles.certificadoContent}>
              fecha de expiración:{" "}
              <span className={styles.wordBold}>Nunca expira</span>
            </p>
          </div>
          <div className={styles.buttonsContainer}>
            <Link href="/verificador">
              <button className={styles.backButton}>Volver</button>
            </Link>
            <Link href="/verificador">
              <button className={styles.verifyWithOtherInfo}>
                Verificar con otros datos
              </button>
            </Link>
          </div>
        </div>
      )}
      {isError && (
        <div className={styles.notFoundContainer}>
          <h1 className={styles.notFoundTitle}>Lo sentimos</h1>
          <p className={styles.notFoundText}>
            Coralify no ha encontrado un certificado con ese id.
          </p>
          <div style={{ width: "64px", margin: "20px auto" }}>
            <Link href="/verificador">
              <button className={styles.backButton}>Volver</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyCertificate;
