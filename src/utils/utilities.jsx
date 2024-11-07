// import React from "react"

import { jwtDecode } from 'jwt-decode'
export function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}


export const defaultLottieOptions = (lottie, loop = true) => {
    return {
        loop: loop,
        autoplay: true,
        animationData: lottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
}


export function decode(access) {
    const data = jwtDecode(access)

    // Assign new key
    data['id'] = data['user_id'];

    // Delete old key
    delete data['user_id'];

    return data
}

//Widget to select images for room creation 
export function showWidget(e, setImages) {
    e.preventDefault()
    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dld2niqwt",
            uploadPreset: "oxxf82pj"
        },
        (error, result) => {
            if (!error && result.event === "success") {
                setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                //  formDataTest.append('images',images)   
            }
            if (error) {
                console.log(error);
            }
        }
    );
    widget.open();
}
// export default function utilities() {
//   return (
//     <div>utilities</div>
//   )
// }


export function filter(t, array, setArray, option) {
    const tmp = array
    switch (option) {
        case t('town'):
            array.sort((a, b) => {
                const cityA = a.city.toUpperCase(); // ignore upper and lowercase
                const cityB = b.city.toUpperCase(); // ignore upper and lowercase
                if (cityA < cityB) {
                    return -1;
                }
                if (cityA > cityB) {
                    return 1;
                }

                // names must be equal
                return 0;
            })
            setArray(tmp)
            break;

        case t('brand'):
            array.sort((a, b) => {
                const marqueA = a.marque.toUpperCase(); // ignore upper and lowercase
                const marqueB = b.marque.toUpperCase(); // ignore upper and lowercase
                if (marqueA < marqueB) {
                    return -1;
                }
                if (marqueA > marqueB) {
                    return 1;
                }

                // names must be equal
                return 0;
            })
            setArray(tmp)
            break;

        case t('model'):
            tmp.sort((a, b) => {
                const modeleA = a.modele.toUpperCase(); // ignore upper and lowercase
                const modeleB = b.modele.toUpperCase(); // ignore upper and lowercase
                if (modeleA < modeleB) {
                    return -1;
                }
                if (modeleA > modeleB) {
                    return 1;
                }

                // names must be equal
                return 0;
            })
            console.log(tmp);
            setArray(tmp)
            break;

        case t('name'):
            tmp.sort((a, b) => {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            })
            console.log(tmp);
            setArray(tmp)
            break;

        case t('price'):
            tmp.sort((a, b) => a.price - b.price);
            console.log(tmp);
            setArray(tmp)
            break;

        default:
            break;
    }
}
