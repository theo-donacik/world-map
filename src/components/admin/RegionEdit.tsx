import { useEffect, useState } from "react";
import { apiGetImage } from "../../dao/files";
import { apiCreateExistingRegion, apiCreateNewRegion, apiDeleteRegion, apiGetRegion, apiSetDefaultRegionId } from "../../dao/region";
import { Region, RegionResponse, RegionStateResponse } from "../../util/types";
import CreateSubregionModal from "./CreateSubregionModal";
import EditRegionBox from "./EditRegionBox";

export default function RegionEdit({defaultRegionId}: {defaultRegionId: string}) {
  const [regionId, setRegionId] = useState<string>(defaultRegionId);
  const [parentRegion, setParentRegion]= useState<Region>();
  const [regions, setRegions] = useState<Region[]>([]);

  const [modalShow, setModalShow] = useState(false);

  const [parentRegionBackground, setBackground] = useState<File | undefined>()
  const [parentColorMap, setColorMap] = useState<File | undefined>()
  const [bgUrl, setBgUrl] = useState<string>();
  const [cmUrl, setCmUrl] = useState<string>();


  const updateRegion = (id: string) => {
    apiGetRegion(id).then((resp) => {
      setParentRegion(resp.parent)
      setRegions(resp.subregions)
    })
    .catch(() => {
      alert("Failed fetch current region")
    });  
  }

  useEffect(() => {
    setRegionId(defaultRegionId)
  }, [defaultRegionId]);

  useEffect(() => {
    if(regionId !== "") {
      updateRegion(regionId)
    }
  }, [regionId]);


  useEffect(() => {
    setBackground(undefined);
    setColorMap(undefined);

    if (parentRegion?.subregionImg) {
      apiGetImage(parentRegion?.subregionImg).then((resp: File) => {
        setBackground(resp)
      });
    }

    if (parentRegion?.colorMapImg) {
      apiGetImage(parentRegion?.colorMapImg).then(setColorMap);
    }
  }, [parentRegion]);


  useEffect(() => {
    if (!parentRegionBackground) {
      setBgUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(parentRegionBackground);
    setBgUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [parentRegionBackground]);


  useEffect(() => {
    if (!parentColorMap) {
      setCmUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(parentColorMap);
    setCmUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [parentColorMap]);

  async function handleNewMapSave(background: string, colorMap: string, dataCSV: string) {
    for(var i in regions) {
      apiDeleteRegion(regions[i]._id)
      .catch(() => {
        alert("Failed to create new region")
      });
    }

    if(parentRegion && parentRegion?._id !== "0") {
      apiCreateExistingRegion(parentRegion._id, background, colorMap, dataCSV)
      .then((resp: RegionResponse) => {
          setModalShow(false)
          updateRegion(resp.parent._id)
      })
      .catch(() => {
        alert("Failed to create region")
      });
    }

    else {
      apiCreateNewRegion(background, colorMap, dataCSV)
        .then((resp: RegionStateResponse) => {
          apiSetDefaultRegionId(resp.region)
          updateRegion(resp.region)
          setModalShow(false)

        })
        .catch(() => {
          alert("Failed to create new region")
        });
    } 
    return;
  }

  if(!parentRegion?.colorMapImg || !parentRegion?.subregionImg) {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => {setModalShow(true)}}>Add Region</button>
        <CreateSubregionModal
          title={"Create First Region"}
          show={modalShow}
          setShow={setModalShow}
          onSave={handleNewMapSave}
        />
      </div>
    
    )
  }

  return (
    <div>
      <div style={{ display: 'grid' }} onClick={() => {setModalShow(true)}}>
        <img style={{width: "100%", gridArea: '1 / 1'}} alt="" key={bgUrl ?? ""} src={bgUrl} />
        <img style={{width: "100%", gridArea: '1 / 1', opacity: "50%"}} alt="" key={cmUrl ?? ""} src={cmUrl} />
      </div>
      {regionId !== defaultRegionId && <button className="btn btn-primary" onClick={() => setRegionId(defaultRegionId)}>
        Go Back
      </button>}
      <div className="edit-boxes">
        {regions.map((region: Region) => (
          <EditRegionBox region={region} setRegion={setRegionId}/>
        ))}
        <CreateSubregionModal
          title={"Replace Region? (You will have to re-create the subregions)"}
          show={modalShow}
          setShow={setModalShow}
          onSave={handleNewMapSave}
        />
      </div>
    </div>
  )

}