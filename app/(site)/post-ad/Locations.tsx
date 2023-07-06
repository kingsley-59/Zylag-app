
import Geocode from 'react-geocode';
import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { setAdProperty } from "@/app/redux/features/newAdSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { GoogleMap, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';


Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string);
Geocode.setRegion('NG');

function Map({ lat = 44, lng = -80 }: { lat?: number, lng?: number, }) {
    const center = useMemo(() => ({ lat, lng }), [lat, lng]);

    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="w-full h-full rounded-xl min-w-[200px] min-h-[200px] bg-slate-200" >
            <Marker position={center} />
        </GoogleMap>
    )
}

export default function Locations({ isLoaded }: { isLoaded: boolean }) {
    const dispatch = useAppDispatch()
    const { latitude, longitude, address } = useAppSelector(state => state.newAd);
    const [geocodeErr, setGeocodeErr] = useState<any>()

    const {
        ready, value, setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    useEffect(() => console.log({ ready, status }), [ready, status])

    useEffect(() => {
        dispatch(setAdProperty({ key: 'address', value: value }))
        if (!value) {
            dispatch(setAdProperty({ key: 'latitude', value: '' }));
            dispatch(setAdProperty({ key: 'longitude', value: '' }));
        }
    }, [value])

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        console.log(results);
        const { lat, lng } = await getLatLng(results[0]);
        dispatch(setAdProperty({ key: 'address', value: address }));
        dispatch(setAdProperty({ key: 'latitude', value: lat }));
        dispatch(setAdProperty({ key: 'longitude', value: lng }));
    }

    const handleUseCurrentLocation = (e: any) => {
        if (!e.target?.checked) {
            dispatch(setAdProperty({ key: 'address', value: '' }));
            dispatch(setAdProperty({ key: 'latitude', value: '' }));
            dispatch(setAdProperty({ key: 'longitude', value: '' }));
            return;
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    Geocode.fromLatLng(String(latitude), String(longitude)).then(
                        (response) => {
                            console.log(response);
                            const address = response.results[0].formatted_address;
                            dispatch(setAdProperty({ key: 'address', value: address }));
                            dispatch(setAdProperty({ key: 'latitude', value: latitude }));
                            dispatch(setAdProperty({ key: 'longitude', value: longitude }));
                        },
                        (error) => {
                            setGeocodeErr(error?.message || error);
                            console.error(error);
                        }
                    );
                },
                (error) => {
                    alert(error.message);
                    console.error(error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        const t = setTimeout(() => {
            setGeocodeErr('')
        }, 5000)

        return () => clearTimeout(t);
    }, [geocodeErr])

    return (
        <>
            <div className="w-full col-start lg:flex-row gap-5 ">
                <div className="basis-full lg:basis-1/2 flex-grow col-start gap-5">
                    <p className="text-gray-300">
                        Choose a convienent location for easy product identification
                    </p>
                    <div className="form-group flex-grow">
                        <label><ul className="list-disc list-inside text-gray-500 "><li>Street Address</li></ul></label>
                        {/* <input id="pac-input" className="form-input" placeholder="street address" required/> */}
                        <Combobox onSelect={handleSelect} className='w-full'>
                            <ComboboxInput
                                value={address}
                                onChange={e => setValue(e.target.value)}
                                disabled={!ready}
                                className='form-input'
                                placeholder='Search an address'
                            />
                            <ComboboxPopover className='shadow'>
                                <ComboboxList className='bg-white rounded-lg'>
                                    {status === 'OK' && data.map(({ place_id, description }) => (
                                        <ComboboxOption className='rounded-lg p-3' key={place_id} value={description} />
                                    ))}
                                </ComboboxList>
                            </ComboboxPopover>
                        </Combobox>
                    </div>
                    <span className="col-start gap-3">
                        <div className="w-full start gap-4">
                            <input type="checkbox" className="w-[30px] aspect-square border border-gray-300" onChange={handleUseCurrentLocation} />
                            <label className="text-gray-300">use my exact location</label>
                        </div>
                        {geocodeErr && <span className="text-xs text-red-500">{geocodeErr}</span>}
                    </span>
                </div>
                <div className="basis-full lg:basis-1/2 flex-grow w-full h-full ">
                    {isLoaded ? (
                        <Map lat={latitude as number} lng={longitude as number} />
                    ) : (
                        <div className="center h-full w-full">
                            Map loading...
                        </div>
                    )}
                    {/* <Map lat={latitude as number} lng={longitude as number} /> */}
                </div>
            </div>
        </>
    )
}
