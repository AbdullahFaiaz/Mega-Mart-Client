import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/ContextComponent";
import useTime from "../../Hook/useTime";
import useDate from "../../Hook/useDate";


const Details = () => {
    const [isSubmitting,setIsSubmitting] = useState(false)
    const {user} = useContext(AuthContext)
    const params = useParams()
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const formRef = useRef(null)
    const {data: property, refetch:refetchPropertyDetails} = useQuery({
        queryKey: ['propertyDetails'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/productDetails?id=${params.id}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })

    const {data: reviews, refetch:refetchReviews} = useQuery({
        queryKey: ['propertyReview'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/propertyReview?id=${params.id}`)
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })

    const modal = document.getElementById('my_modal_5');

    
    const addReviewMutation = useMutation({
        mutationFn: async (Review) => {
          const response = await axiosSecure.post("/review", Review);
          return response.data;
        },
        onError: (error) => {
          console.error("Error adding review:", error.message);
        },
        onSuccess: (data) => {
        //   console.log("from client", data);
          if (data.insertedId) {
            refetchReviews()
            Swal.fire({
              title: 'Success!',
              text: 'Review added successfully',
              icon: 'success',
              confirmButtonText: 'Okay'
            });
          }
        }
      });



      const time = useTime()
      const date = useDate()
  // Handle form submission
    const onSubmit = async (data) => {
        
        const Review = {
            propertyId:params?.id,
            Review: data.Review,
            ReviewerEmail: user?.email,
            ReviewerName: user?.displayName,
            AgentName: property.AgentName,
            Title: property.Title,
            Time: " "+time+',' +" "+ date,
            SortingTime: new Date(),
            PropertyTitle: property.Title,
            ReviewerImage: user?.photoURL
        }
        modal.close();
        addReviewMutation.mutate(Review)
        formRef.current.reset()


    };




   const addToWishListMutation = useMutation({
    mutationFn: async (wishedProperty) => {
      try {
        const response = await axiosSecure.post(`/wishlist?email=${user.email}`, wishedProperty);
        setIsSubmitting(false)
        return response.data;
      } catch (error) {
        console.error("Error in mutationFn:", error); // Log detailed error
        throw error; // Rethrow the error to be caught by onError
      }
    },
        onError: (error) => {
          console.error("Error adding to wishlist:", error.message);
          setIsSubmitting(false)
        },
        onSuccess: (data) => {
          setIsSubmitting(false)
        //   console.log("from client", data);
          if (data.insertedId) {
            Swal.fire({
              title: 'Success!',
              text: 'Successfully added to wishlist',
              icon: 'success',
              confirmButtonText: 'Okay'
            });
          }
          else{
            Swal.fire({
              title: 'Warning',
              text: 'Already added to wishlist',
              icon: 'warning',
              confirmButtonText: 'Okay'
            });
          }
        }
      });



    const handleWishList = (id) => {
      setIsSubmitting(true)
      const wishedProperty = {
        Title:property?.Title,
        Location:property?.Location,
        Image: property?.Image,
        AgentName:property?.AgentName,
        AgentEmail:property?.email,
        AgentImage: property?.AgentImage,
        Description:property?.Description,
        minPrice:property?.minPrice,
        maxPrice:property?.maxPrice,
        propertyId: id,//property._id
        VerificationStatus: property?.Status,
        WisherEmail: user?.email,
        WisherName: user?.displayName,
    };
      addToWishListMutation.mutate(wishedProperty)
    }

    return (
        <div>

            <div className="relative pt-[80px] mb-[1vw] w-full lg:w-[60%] mx-auto rounded overflow-hidden shadow-lg">
            <img src={property?.productImage} alt={property?.Title} className="m-4 w-[500px] mx-auto h-[500px] object-cover" />
            <hr />
            <div className="flex justify-between mt-4">
            {/* <img src={property?.AgentImage} alt={property?.Title} className="w-full h-[30vw] md:h-[22vw] lg:h-[16vw] object-cover" /> */}

            <div className="px-[25px]">
                <div className="font-bold text-[15px] md:text-[28px]">{property?.productName}</div>
                <p className="text-[12px] md:text-[20px]">
                    <span className="font-semibold">Location:</span> {property?.category}
                </p>
                <p className="text-[12px] md:text-[20px]">
                    <span className="font-semibold">Agent Name:</span> ${property?.price}
                </p>

                <p className="text-[12px] md:text-[20px]">
                    <span className="font-semibold">Property Status:</span> {property?.ratings}
                </p>                

                <p className="text-[12px] md:text-[20px]">
                    <span className="font-semibold">Property Description:</span> {property?.description}
                </p>
            </div>



            </div>
            <div className="px-[25px] py-[10px]">

            </div>
        </div>
</div>
    )



};

export default Details;