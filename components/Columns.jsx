import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { CiFilter, CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import { universityListServer } from "@/constants/server";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

const Columns = ({ title, items }) => {
  const { device } = useGlobalContext();
  const [filters, setFilters] = useState([
    {
      title: "price",
      min: 0,
      max: 0,
      active: false,
    },
    {
      title: "campus",
      all: ["university of abuja", "university of lagos"],
      selected: [],
      active: false,
    },
    {
      title: "date posted",
      all: ["24 hours", "7 days", "4 weeks"],
      selected: "",
      active: false,
    },
  ]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [dropDown, setDropDown] = useState("");
  const [unis, setUnis] = useState([]);
  const [campusSearch, setCampusSearch] = useState("");
  const [campusSearchResult, setCampusSearchResult] = useState([]);

  const getUnis = async () => {
    try {
      const response = await fetch(
        `${universityListServer}/search?country=Nigeria`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Cookie: cookie,
          },
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.ok) {
        setUnis(data);
      } else {
        console.log(data);
        throw new Error(`Failed to fetch Universities`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (filteredData.length !== 0) {
      setData(filteredData);
    } else {
      setData(items);
    }
  }, [filters]);

  useEffect(() => {
    getUnis();

    // return () => {
    //   second
    // }
  }, []);

  const FilterByPrice = () => {
    return <div></div>;
  };
  return (
    <div className={`w-full mt-5 bg-white rounded-lg py-4`}>
      <div className="border-b border-gray-200 py-1 px-5">
        <div className="flex items-center justify-between ">
          <div className="font-semibold text-md">{title}</div>
          <div className="flex cursor-pointer text-nowrap items-center space-x-1 text-[12.8px] font-medium">
            <span>Sort by:</span>
            <span className="capitalize font-normal">popular rating</span>
            <div>
              <HiChevronDown />
            </div>
          </div>
        </div>
        <div className="flex items-center py-1 space-x-2">

          <div className="flex-1 flex flex-wrap items-center py-1 gap-x-4 gap-y-2 scrollbar-small">
          <div className="flex items-center group bg-[#f0f5f7] px-3 py-1 rounded-[20px] font-medium text-base space-x-2 cursor-pointer">
            <span className="text-sm grouup-hover:text-[#ffa70f]">Filters</span>
            <span className="089123">
              <CiFilter />
            </span>
            {/* <span className="w-6 flex items-center group-hover:text-[#ffa70f] justify-center rounded-full h-6 bg-white">
              <HiChevronDown />
            </span> */}
          </div>

          <span className="text-gray-500">|</span>

            {filters.map((catg, i) => (
              <div
                key={i}
                className="flex relative items-center flex-nowrap group bg-[#f0f5f7] px-3 py-1 rounded-[20px] font-medium text-base"
              >
                <span className="text-[13px] text-nowrap mr-2 capitalize grouup-hover:text-[#ffa70f]">
                  {catg?.title}
                </span>
                <span
                  onClick={() => {
                    if (dropDown !== catg?.title) {
                      setDropDown(catg?.title);
                      console.log(catg);
                    } else {
                      setDropDown("");
                    }
                  }}
                  className="w-6 cursor-pointer flex items-center group-hover:text-[#ffa70f] justify-center rounded-full h-6 bg-white"
                >
                  <HiChevronDown />
                </span>

                {dropDown === catg?.title && (
                  <div
                    className={`z-10 absolute top-full mt-2 p-3 min-w-[250px] max-w-[300px] rounded-lg border border-gray-200 bg-white shadow-lg transition-all`}
                    style={{
                      left: "0",
                      right: "auto",
                    }}
                    ref={(el) => {
                      if (el) {
                        const rect = el.getBoundingClientRect();
                        const overflowsRight = rect.right > window.innerWidth;

                        if (overflowsRight) {
                          el.style.left = "auto";
                          el.style.right = "0";
                        }
                      }
                    }}
                  >
                    {catg?.title === "price" && (
                      <>
                        <div className="text-[12px] text-gray-700 font-semibold uppercase">
                          price ($)
                        </div>
                        <div className="w-full mt-2 flex items-center justify-between">
                          <div className="w-2/5 text-[12px]">
                            <input
                              type="number"
                              className="w-full outline-1 outline-gray-300 rounded-sm px-3 py-1.5 border border-gray-200"
                              placeholder="0"
                              defaultValue=""
                              color="#ffa70f"
                              min={0}
                              max={50000000}
                              name="min-price"
                            />
                            <div className="w-full mt-1 text-gray-500 text-[10px]">
                              Min Price
                            </div>
                          </div>

                          <div className="w-3 border-t -mt-4 border-gray-500"></div>

                          <div className="w-2/5 text-[12px]">
                            <input
                              type="number"
                              className="w-full outline-1 outline-gray-300 rounded-sm px-3 py-1.5 border border-gray-200"
                              placeholder="0"
                              defaultValue=""
                              color="#ffa70f"
                              min={0}
                              max={50000000}
                              name="max-price"
                            />
                            <div className="w-full mt-1 text-gray-500 text-[10px]">
                              max Price
                            </div>
                          </div>
                        </div>
                        <div className="w-full mt-4 flex items-center justify-between">
                          <div className="w-2/5 text-center text-sm capitalize border border-gray-300 cursor-pointer rounded-md px-4 py-1.5 text-gray-500">
                            reset
                          </div>
                          <div className="w-2/5 text-center bg-[#ffa70f] text-sm capitalize border border-[#ffa70f] cursor-pointer rounded-md px-4 py-1.5 text-white">
                            apply
                          </div>
                        </div>
                      </>
                    )}

                    {catg?.title === "campus" && (
                      <>
                        <div className="w-full py-2 rounded-3xl  bg-[#f0f5f7] flex items-center">
                          <input
                            className={`w-full  px-3 focus-within:outline-0 placeholder-gray-700 ${
                              device === "phone" ? "text-[10px]" : "text-[12px]"
                            }`}
                            placeholder="Search Campus"
                            onChange={(e) => {
                              setCampusSearch(e.target.value);
                              const searchResult = unis.filter((uni) => {
                                const name = uni?.name.toLowerCase();
                                const query = e.target.value.toLowerCase();
                                if (name?.includes(query)) return uni;
                              });
                              setCampusSearchResult(searchResult);
                            }}
                            type="text"
                            value={campusSearch}
                            name="search-region"
                            id="search-region"
                          />
                          <div className="py-1 cursor-pointer px-4">
                            <CiSearch />
                          </div>
                        </div>

                        {campusSearch && (
                          <>
                            <div className="text-[10px] mt-3 text-gray-700 font-semibold">
                              Results
                            </div>

                            {campusSearchResult.length > 0 ? (
                              <div
                                className={`flex mt-2 flex-col overflow-auto w-full h-[15dvh]`}
                              >
                                {campusSearchResult.map((uni, i) => (
                                  <div
                                    onClick={() => {
                                      setFilters((prevState) => {
                                        return prevState.map(
                                          (filter, index) => {
                                            if (index === 1) {
                                              // campus filter is at index 1
                                              const isSelected =
                                                filter.selected.includes(
                                                  uni?.name
                                                );
                                              let newSelected;

                                              if (isSelected) {
                                                // Remove it
                                                newSelected =
                                                  filter.selected.filter(
                                                    (name) => name !== uni?.name
                                                  );
                                              } else {
                                                // Add it
                                                newSelected = [
                                                  ...filter.selected,
                                                  uni?.name,
                                                ];
                                              }

                                              return {
                                                ...filter,
                                                selected: newSelected,
                                              };
                                            }
                                            return filter;
                                          }
                                        );
                                      });
                                    }}
                                    key={i}
                                    className="flex p-1.5 rounded-md hover:bg-[#f0f5f7] cursor-pointer items-center space-x-1"
                                  >
                                    <div className="text-2xl font-semibold text-[#ffa70f]">
                                      {filters[1]?.selected.includes(
                                        uni?.name
                                      ) ? (
                                        <BiCheckboxChecked />
                                      ) : (
                                        <BiCheckbox />
                                      )}
                                    </div>
                                    <span className="text-[10px] text-ellipsis text-gray-700 text-nowrap font-medium">
                                      {uni?.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-[10px] text-center mt-1 text-gray-700 font-meduim italic">
                                Campus not found!
                              </div>
                            )}
                          </>
                        )}

                        {!campusSearch && unis.length > 0 ? (
                          <div
                            className={`flex mt-3 flex-col overflow-auto w-full h-[17dvh]`}
                          >
                            {unis.map((uni, i) => (
                              <div
                                onClick={() => {
                                  setFilters((prevState) => {
                                    return prevState.map((filter, index) => {
                                      if (index === 1) {
                                        // campus filter is at index 1
                                        const isSelected =
                                          filter.selected.includes(uni?.name);
                                        let newSelected;

                                        if (isSelected) {
                                          // Remove it
                                          newSelected = filter.selected.filter(
                                            (name) => name !== uni?.name
                                          );
                                        } else {
                                          // Add it
                                          newSelected = [
                                            ...filter.selected,
                                            uni?.name,
                                          ];
                                        }

                                        return {
                                          ...filter,
                                          selected: newSelected,
                                        };
                                      }
                                      return filter;
                                    });
                                  });
                                }}
                                key={i}
                                className="flex p-1.5 rounded-md hover:bg-[#f0f5f7] cursor-pointer items-center space-x-1"
                              >
                                <div className="text-2xl font-semibold text-[#ffa70f]">
                                  {filters[1]?.selected.includes(uni?.name) ? (
                                    <BiCheckboxChecked />
                                  ) : (
                                    <BiCheckbox />
                                  )}
                                </div>
                                <span className="text-[10px] text-ellipsis text-gray-700 text-nowrap font-medium">
                                  {uni?.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[10px] text-center mt-3 text-gray-700 font-meduim italic">
                            Campus not found!
                          </div>
                        )}

                        <div className="w-full mt-4 flex items-center justify-between">
                          <div
                            onClick={() => {
                              setFilters((prevState) => {
                                return prevState.map((filter, index) => {
                                  if (index === 1)
                                    return {
                                      ...filter,
                                      selected: [],
                                    };

                                  return filter;
                                });
                              });
                            }}
                            className="w-2/5 cursor-pointer text-center text-sm capitalize border border-gray-300 rounded-md px-4 py-1.5 text-gray-500"
                          >
                            reset
                          </div>
                          <div className="w-2/5 text-center cursor-pointer bg-[#ffa70f] text-sm capitalize border text-nowrap border-[#ffa70f] rounded-md px-4 py-1.5 text-white">
                            apply ({filters[1]?.selected?.length})
                          </div>
                        </div>
                      </>
                    )}

                    {catg?.title === "date posted" && (
                      <>
                        <div className="text-[12px] text-gray-700 font-semibold uppercase">
                          select date range
                        </div>

                        <div className={`flex mt-2 flex-col w-full`}>
                          {filters[2].all.map((range, i) => (
                            <div
                              onClick={() => {
                                setFilters((prevState) => {
                                  return prevState.map((filter, index) => {
                                    if (index === 2) {
                                      // campus filter is at index 2
                                      const isSelected =
                                        filter.selected === range;
                                      let newSelected;

                                      if (isSelected) {
                                        // Remove it
                                        newSelected = "";
                                      } else {
                                        // Add it
                                        newSelected = range;
                                      }

                                      return {
                                        ...filter,
                                        selected: newSelected,
                                      };
                                    }
                                    return filter;
                                  });
                                });
                              }}
                              key={i}
                              className="flex p-1.5 rounded-md hover:bg-[#f0f5f7] cursor-pointer items-center space-x-1"
                            >
                              <div className="text-2xl font-semibold text-[#ffa70f]">
                                {filters[2]?.selected === range ? (
                                  <BiCheckboxChecked />
                                ) : (
                                  <BiCheckbox />
                                )}
                              </div>
                              <span className="text-[10px] text-ellipsis text-gray-700 text-nowrap font-medium">
                                Past {range}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="w-full mt-3 flex items-center justify-between">
                          <div
                            onClick={() => {
                              setFilters((prevState) => {
                                return prevState.map((filter, index) => {
                                  if (index === 2)
                                    return {
                                      ...filter,
                                      selected: "",
                                    };

                                  return filter;
                                });
                              });
                            }}
                            className="w-2/5 cursor-pointer text-center text-sm capitalize border border-gray-300 rounded-md px-4 py-1.5 text-gray-500"
                          >
                            reset
                          </div>
                          <div className="w-2/5 text-center cursor-pointer bg-[#ffa70f] text-sm capitalize border text-nowrap border-[#ffa70f] rounded-md px-4 py-1.5 text-white">
                            apply
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`grid items-center mt-2 gap-x-4 gap-y-6 px-4 ${
          device === "phone"
            ? "grid-cols-2"
            : device === "tablet"
            ? "grid-cols-3"
            : device === "desktop" && "grid-cols-5"
        }`}
      >
        {data?.map((item, i) => (
          <Card key={i} item={item} index={i} type={"column"} device={device} />
        ))}
      </div>
    </div>
  );
};

export default Columns;
