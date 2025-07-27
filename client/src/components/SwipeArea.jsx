import TinderCard from "react-tinder-card";
import { useMatchStore } from '../store/useMatchStore';

const SwipeArea = () => {
    const { userProfiles, swipeLeft, swipeRight } = useMatchStore();
    
    const handleSwipe = (dir, user) => {
        if (dir === "right") swipeRight(user);
        else if (dir === "left") swipeLeft(user);
    };

    return (
        <div className='relative w-full max-w-md h-[28rem] flex items-center justify-center'>
            {userProfiles.map((user) => (
                <TinderCard
                    className='absolute'
                    key={user._id}
                    onSwipe={(dir) => handleSwipe(dir, user)}
                    swipeRequirementType='position'
                    swipeThreshold={100}
                    preventSwipe={["up", "down"]}
                >
                    <div
                        className='card bg-white w-[22rem] h-[26rem] select-none rounded-xl overflow-hidden 
                        border border-gray-200 shadow-lg flex flex-col'
                    >
                        <figure className='h-2/3 flex items-center justify-center p-3'>
                            <img
                                src={user.image || "/avatar.png"}
                                alt={user.name}
                                className='rounded-lg object-contain w-full h-full pointer-events-none'
                            />
                        </figure>
                        <div className='card-body bg-gradient-to-b from-white to-pink-50 
                            flex flex-col items-center justify-center p-4'>
                            <h2 className='card-title text-xl font-semibold text-gray-800 text-center'>
                                {user.name}, {user.age}
                            </h2>
                            <p className='text-gray-600 text-sm text-center line-clamp-2'>
                                {user.bio}
                            </p>
                        </div>
                    </div>
                </TinderCard>
            ))}
        </div>
    );
};

export default SwipeArea;